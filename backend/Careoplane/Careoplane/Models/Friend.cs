using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Careoplane.Models
{
    public class Friend
    {
        public int FriendAId { get; set; }
        [Required]
        public AppUser FriendA { get; set; }
        public int FriendBId { get; set; }
        [Required]
        public AppUser FriendB { get; set; }
    }
}
