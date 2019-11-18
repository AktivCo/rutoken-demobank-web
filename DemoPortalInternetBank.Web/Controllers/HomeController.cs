using Microsoft.AspNetCore.Mvc;

namespace DemoPortalInternetBank.Web.Controllers
{
    public class HomeController : Controller
    {
        // GET
        public IActionResult Index()
        {
            return View();
        }
    }
}