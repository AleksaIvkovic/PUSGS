using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Careoplane.Database;
using Careoplane.Models;
using Careoplane.TOModels;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace Careoplane.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AppUsersController : ControllerBase
    {
        private UserManager<AppUser> _userManager;
        private SignInManager<AppUser> _signInManager;
        private readonly ApplicationSettings _appSettings;
        private readonly AuthenticationContext _context;
        private readonly DatabaseContext _contextDB;

        public AppUsersController(UserManager<AppUser> userManager,
            SignInManager<AppUser> signInManager, IOptions<ApplicationSettings> appSettings, AuthenticationContext context, DatabaseContext contextDB)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _appSettings = appSettings.Value;
            _context = context;
            _contextDB = contextDB;
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Route("GetUserProfile")]
        //GET : /api/UserProfile
        public async Task<Object> GetUserProfile()
        {
            string userId = User.Claims.First(c => c.Type == "UserID").Value;
            string role = User.Claims.First(c => c.Type == "Roles").Value;
            var user = await _userManager.FindByIdAsync(userId);
            List<Friend> friendsA = new List<Friend>();
            List<Friend> friendsB = new List<Friend>();
            friendsA = await _context.Friends.Include(f => f.FriendA).Include(f => f.FriendB).Where(f => f.FriendA == user).ToListAsync();
            friendsB = await _context.Friends.Include(f => f.FriendA).Include(f => f.FriendB).Where(f => f.FriendB == user).ToListAsync();
            
            List<TOFriend> tOFriendsA = new List<TOFriend>();
            List<TOFriend> tOFriendsB = new List<TOFriend>();

            friendsA.ForEach(f => tOFriendsA.Add(new TOFriend(f)));
            friendsB.ForEach(f => tOFriendsB.Add(new TOFriend(f)));

            List<FlightReservation> flightReservations = new List<FlightReservation>();
            flightReservations = await _contextDB.FlightReservations.Where(r => r.AppUserName == user.UserName).ToListAsync();

            List<TOFlightReservation> tOFlightReservations = new List<TOFlightReservation>();
            flightReservations.ForEach(f => tOFlightReservations.Add(new TOFlightReservation(f)));

            return new
            {
                user.Name,
                user.Surname,
                user.Email,
                user.UserName,
                user.City,
                user.Company,
                user.PhoneNumber,
                role,
                tOFriendsA,
                tOFriendsB,
                tOFlightReservations
            };
        }

        [HttpPut("UpdateUser")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<Object> UpdateUser([FromBody]TOAppUser updatedUser)
        {
            string userId = User.Claims.First(c => c.Type == "UserID").Value;
            string role = User.Claims.First(c => c.Type == "Roles").Value;

            try
            {
                var user = await _userManager.FindByIdAsync(userId);
                user.Name = updatedUser.Name;
                user.Surname = updatedUser.Surname;
                user.City = updatedUser.City;
                user.PhoneNumber = updatedUser.PhoneNumber;
                await _userManager.UpdateAsync(user);
                return Ok(new { user });
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpPut("UpdateCompany/{username}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<Object> UpdateCompany([FromBody]object company)
        {
            string userId = User.Claims.First(c => c.Type == "UserID").Value;
            string role = User.Claims.First(c => c.Type == "Roles").Value;
            
            try
            {
                var user = await _userManager.FindByIdAsync(userId);
                user.Company = company.ToString().Split(':')[1].Split("\"")[1];
                await _userManager.UpdateAsync(user);
                await _userManager.RemoveFromRoleAsync(user, role);
                if (role == "racAdminNew")
                {
                    await _userManager.AddToRoleAsync(user, "racAdmin");
                } else
                {
                    await _userManager.AddToRoleAsync(user, "aeroAdmin");
                }
                return Ok(new { user.Company });
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpPost]
        [Route("Register")]
        //POST : /api/AppUsers/Register
        public async Task<Object> PostApplicationUser(TOAppUser model)
        {
            var applicationUser = new AppUser()
            {
                UserName = model.UserName,
                Email = model.Email,
                Name = model.Name,                               
                Surname = model.Surname, 
                PhoneNumber = model.PhoneNumber,
                City = model.City,
                Company = model.Company
            };

            try
            {
                var result = await _userManager.CreateAsync(applicationUser, model.Password);
                if (result.Succeeded)
                {
                    await _userManager.AddToRoleAsync(applicationUser, model.Role);
                }
                
                return Ok(result);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpPost]
        [Route("Login")]
        //POST : /api/AppUsers/Login
        public async Task<IActionResult> Login(LoginModel model)
        {
            AppUser user;

            if (model.UserName.Contains('@'))
            {
                user = await _userManager.FindByEmailAsync(model.UserName);
            } else
            {
                user = await _userManager.FindByNameAsync(model.UserName);
            }
             
            if (user != null && await _userManager.CheckPasswordAsync(user, model.Password))
            {
                var roles = await _userManager.GetRolesAsync(user);
                var Subject = new ClaimsIdentity(new Claim[]
                    {
                        new Claim("UserID", user.Id.ToString()),
                        new Claim("Roles", roles[0].ToString())
                    });
                var Expires = DateTime.UtcNow.AddDays(1);
                var SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_appSettings.JWT_Secret)), SecurityAlgorithms.HmacSha256Signature);
                var tokenDescriptor = new SecurityTokenDescriptor() { Subject = Subject, Expires = Expires, SigningCredentials = SigningCredentials };

                var tokenHandler = new JwtSecurityTokenHandler();
                var securityToken = tokenHandler.CreateToken(tokenDescriptor);
                var token = tokenHandler.WriteToken(securityToken);
                string role = roles[0].ToString();
                string username = user.UserName;
                return Ok(new { token, username, role });
            }
            else
                return BadRequest(new { message = "Username or password is incorrect." });
        }

        [HttpPost]
        [Route("SocialLogin")]
        // POST: api/<controller>/Login
        public async Task<IActionResult> SocialLogin([FromBody]LoginModel model)
        {
            var test = _appSettings.JWT_Secret;
            if (VerifyToken(model.IdToken))
            {
                var applicationUser = new AppUser()
                {
                    UserName = model.Email,
                    Email = model.Email,
                    Name = model.FirstName,
                    Surname = model.LastName,
                    PhoneNumber = "",
                    City = "",
                    Company = ""
                };

                try
                {
                    var result = await _userManager.CreateAsync(applicationUser, "socialUser");
                    
                    if (result.Succeeded)
                    {
                        await _userManager.AddToRoleAsync(applicationUser, "regular");
                    }
                }
                catch (Exception ex)
                {

                }

                var user = await _userManager.FindByEmailAsync(model.Email);

                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                        new Claim("UserID", user.Id.ToString()),
                        new Claim("Roles", "regular")
                    }),
                    Expires = DateTime.UtcNow.AddDays(1),
                    //Key min: 16 characters
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_appSettings.JWT_Secret)), SecurityAlgorithms.HmacSha256Signature)
                };
                var tokenHandler = new JwtSecurityTokenHandler();
                var securityToken = tokenHandler.CreateToken(tokenDescriptor);
                var token = tokenHandler.WriteToken(securityToken);

                return Ok(new { token });
            }

            return Ok();
        }

        [HttpPut("FriendshipStatus/{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<Object> updateFriendshipStatus(int id, [FromBody]object status)
        {
            try
            {
                var friendship = await _context.Friends.FindAsync(id);
                var stat = status.ToString().Split(':')[1].Split("\"")[1];
                friendship.Status = stat;

                _context.Entry(friendship).State = EntityState.Modified;

                _context.SaveChanges();

                return Ok(new { status });
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpDelete]
        [Route("DeleteFriendship/{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult<Friend>> deleteFriendship(int id)
        {
            var friendship = await _context.Friends.FindAsync(id);

            if(friendship == null)
            {
                return NotFound();
            }

            _context.Friends.Remove(friendship);
            await _context.SaveChangesAsync();

            return friendship;
        }

        [HttpGet]
        [Route("AllUsers")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<Object> GetAllusers()
        {
            return await _userManager.GetUsersInRoleAsync("regular");
        }

        [HttpGet("GetFriend/{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult<Friend>> GetFriend (int id)
        {
            var friend = await _context.Friends
                .Include(f => f.FriendA)
                .Include(f => f.FriendB)
                .FirstOrDefaultAsync(f => f.Id == id);

            if (friend == null)
            {
                return NotFound();
            }

            return friend;
        }

        [HttpPost]
        [Route("AddFriendship")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<Object> AddFrienship([FromBody]JObject Obj)
        {
            var userA = Obj["userA"].ToObject<AppUser>();
            var userB = Obj["userB"].ToObject<AppUser>();

            AppUser tempUserA = await _userManager.FindByNameAsync(userA.UserName);
            AppUser tempUserB = await _userManager.FindByNameAsync(userB.UserName);

            Friend friend = new Friend()
            {
                Id = 0,
                FriendA = tempUserA,
                FriendB = tempUserB,
                Status = "pending"
            };

            _context.Friends.Add(friend);

            await _context.SaveChangesAsync();

            return CreatedAtAction("GetFriend", new { id = friend.Id }, friend);
        }

        private const string GoogleApiTokenInfoUrl = "https://www.googleapis.com/oauth2/v3/tokeninfo?id_token={0}";

        public bool VerifyToken(string providerToken)
        {
            var httpClient = new HttpClient();
            var requestUri = new Uri(string.Format(GoogleApiTokenInfoUrl, providerToken));

            HttpResponseMessage httpResponseMessage;

            try
            {
                httpResponseMessage = httpClient.GetAsync(requestUri).Result;
            }
            catch (Exception ex)
            {
                return false;
            }

            if (httpResponseMessage.StatusCode != HttpStatusCode.OK)
            {
                return false;
            }

            var response = httpResponseMessage.Content.ReadAsStringAsync().Result;
            var googleApiTokenInfo = JsonConvert.DeserializeObject<GoogleApiTokenInfo>(response);

            return true;
        }
    }
}