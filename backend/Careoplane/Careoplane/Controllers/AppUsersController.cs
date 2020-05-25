using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Careoplane.Models;
using Careoplane.TOModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace Careoplane.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AppUsersController : ControllerBase
    {
        private UserManager<AppUser> _userManager;
        private SignInManager<AppUser> _signInManager;
        private readonly ApplicationSettings _appSettings;

        public AppUsersController(UserManager<AppUser> userManager,
            SignInManager<AppUser> signInManager, IOptions<ApplicationSettings> appSettings)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _appSettings = appSettings.Value;
        }

        [HttpGet("{username}")]
        public async Task<ActionResult<TOAppUser>> GetAppUser(string username)
        {
            var user = await _userManager.FindByNameAsync(username);

            if (user == null)
            {
                return NotFound();
            }

            return user.ToTO();
        }

        [HttpPut("UpdateCompany/{username}")]
        public async void UpdateCompany(string username, [FromBody]object company)
        {
            try
            {
                var user = await _userManager.FindByNameAsync(username);
                string comp = company.ToString().Split(':')[1].Split("\"")[1]; //{\r\n  \"company\": \"Europcar\"\r\n}
                user.Company = comp;
                var s = await _userManager.UpdateAsync(user);
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
            var user = await _userManager.FindByNameAsync(model.UserName);
            if (user != null && await _userManager.CheckPasswordAsync(user, model.Password))
            {
                var roles = await _userManager.GetRolesAsync(user);
                var Subject = new ClaimsIdentity(new Claim[]
                    {
                        new Claim("UserID",user.Id.ToString()),
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
    }
}