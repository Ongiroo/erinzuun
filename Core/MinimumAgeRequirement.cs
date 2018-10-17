using Microsoft.AspNetCore.Authorization;

namespace erinzuun.Core
{
    public class MinimumAgeRequirement : IAuthorizationRequirement
    {
        public MinimumAgeRequirement(int age)
        {
            MinimumAge = age;
        }
       public int MinimumAge { get; set; }        
    }
}