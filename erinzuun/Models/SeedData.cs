#define Rating
#if Rating
// Seed without Rating
#region snippet_1 
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace erinzuun.Models
{
    public class SeedData
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            using (var context = new erinzuunContext(
                serviceProvider.GetRequiredService<DbContextOptions<erinzuunContext>>()))
            {
                // Look for any Assets.
                if (context.Asset.Any())
                {
                    return;   // DB has been seeded
                }

#region snippet1
                context.Asset.AddRange(
                    new Asset
                    {
                        Name = "When Harry Met Sally",
                        ReleaseDate = DateTime.Parse("1989-2-12"),
                        Class = "Romantic Comedy",
                        Price = 7.99M
                    },
#endregion

                    new Asset
                    {
                        Name = "Ghostbusters ",
                        ReleaseDate = DateTime.Parse("1984-3-13"),
                        Class = "Comedy",
                        Price = 8.99M
                    },

                    new Asset
                    {
                        Name = "Ghostbusters 2",
                        ReleaseDate = DateTime.Parse("1986-2-23"),
                        Class = "Comedy",
                        Price = 9.99M
                    },

                    new Asset
                    {
                        Name = "Rio Bravo",
                        ReleaseDate = DateTime.Parse("1959-4-15"),
                        Class = "Western",
                        Price = 3.99M
                    }
                );
                context.SaveChanges();
            }
        }
    }
}
#endregion
#endif