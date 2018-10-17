using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace erinzuun.Core
{
    public interface IPhotoStorage
    {
        Task<string> StorePhoto(string uploadFolderPath, IFormFile file);
    }
}
