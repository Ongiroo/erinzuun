using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace erinzuun.Models
{
    public class Stock
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public DateTime ReleaseDate { get; set; }
        public DateTime DevelopmentDate { get; set; }
        public string Type { get; set; }
        public decimal Price { get; set; }
    }
}
