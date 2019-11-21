using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DemoPortalInternetBank.Web.Controllers
{
    class UserModel
    {
        public string FullName { get; set; }
        public string ObjectId { get; set; }
    }

    [Route("api/user")]
    [Authorize(AuthenticationSchemes = CookieAuthenticationDefaults.AuthenticationScheme)]
    public class UserController : Controller
    {
        [Route("info")]
        [HttpGet]
        // GET
        public IActionResult Index()
        {
            var user = new UserModel();

            foreach (var claim in User.Claims)
            {
                if (claim.Type == "FullName")
                {
                    user.FullName = claim.Value;
                }

                if (claim.Type == "ObjectId")
                {
                    user.ObjectId = claim.Value;
                }
            }

            return Ok(user);
        }

        [Route("logout")]
        [HttpGet]
        // GET
        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);

            return Ok();
        }
    }
}