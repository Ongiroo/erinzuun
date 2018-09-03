using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace erinzuun.Models
{
    public class erinzuunContext : DbContext
    {
        public erinzuunContext (DbContextOptions<erinzuunContext> options)
            : base(options)
        {
        }

        public DbSet<erinzuun.Models.Asset> Asset { get; set; }
    }
}
