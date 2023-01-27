using API.Core.DbModels.Identity;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace API.Infrastructure.DataContext
{
    public class AppIdentityDbContextSeed
    {
        public static async Task SeedUserAsync(UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any())
            {
                var user = new AppUser
                {
                    DisplayName = "Kadir",
                    Email = "kadirgulteekin@gmial.com",
                    UserName = "kadirgulteekin",
                    Address = new Address
                    {
                        FirstName = "Kadir",
                        LastName = "Gültekin",
                        Street = "Kocaeli Gaziler",
                        City = "İstanbul",
                        State = "TR",
                        ZipCode = "4100"
                    }
                };
                await userManager.CreateAsync(user,"A123456");
            }
        }
    }
}
