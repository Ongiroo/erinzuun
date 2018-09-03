using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using erinzuun.Models;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace erinzuun.Pages.Portfolio
{
    public class IndexModel : PageModel
    {
        private readonly erinzuun.Models.erinzuunContext _context;

        public IndexModel(erinzuun.Models.erinzuunContext context)
        {
            _context = context;
        }

        public IList<Asset> Asset { get;set; }
        public SelectList Classes { get; set; }
        public string AssetClass { get; set; }

        // Requires using Microsoft.AspNetCore.Mvc.Rendering;
        public async Task OnGetAsync(string assetClass, string searchString)
        {
            // Use LINQ to get list of class.
            IQueryable<string> classQuery = from m in _context.Asset
                                            orderby m.Class
                                            select m.Class;

            var assets = from m in _context.Asset
                         select m;

            if (!String.IsNullOrEmpty(searchString))
            {
                assets = assets.Where(s => s.Name.Contains(searchString));
            }

            if (!String.IsNullOrEmpty(assetClass))
            {
                assets = assets.Where(x => x.Class == assetClass);
            }
            Classes = new SelectList(await classQuery.Distinct().ToListAsync());

            Asset = await assets.ToListAsync();
            //Asset = await _context.Asset.ToListAsync();
        }
    }
}
