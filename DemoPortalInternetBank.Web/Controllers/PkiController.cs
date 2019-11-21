using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using DemoPortalInternetBank.Pki;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DemoPortalInternetBank.Web.Controllers
{
    [Route("api/pki")]
    public class PkiController : Controller
    {
        [Route("random")]
        [HttpGet]
        // GET
        public IActionResult Index()
        {
            var random = PkiProvider.GenerateRandom();
            var arr = random.Select(Convert.ToByte).ToArray();
            HttpContext.Session.Set("RandomString", arr);
            return Ok(random);
        }

        [Route("login")]
        [HttpPost]
        public async Task<IActionResult> LoginRequest([FromBody] CmsRequest loginRequest)
        {
            var byteArr = HttpContext.Session.Get("RandomString").Select(Convert.ToChar);
            var str = string.Join("", byteArr);
            var result = PkiProvider.VerifySignature(loginRequest.Cms, str);

            if (!result) return BadRequest();

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, "test@mail.ru"),
                new Claim("FullName", "vladimir"),
                new Claim(ClaimTypes.Role, "Administrator"),
                new Claim("ObjectId", loginRequest.ObjectId)
            };

            var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);

            await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme,
                new ClaimsPrincipal(claimsIdentity));

            return Ok();
        }


        [Route("register")]
        [HttpPost]
        public IActionResult Register([FromBody] CmsRequest loginRequest)
        {
            var cert = PkiProvider.IssueCertificate(loginRequest.Cms);
            var pem = PemHelper.ToPem("CERTIFICATE", cert.GetEncoded());

            return Ok(pem);
        }
    }

    public class CmsRequest
    {
        public string Cms { get; set; }
        public string ObjectId { get; set; }
    }
}