using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using DemoPortalInternetBank.Domain.Services;
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
        private readonly PaymentService _paymentService;

        public PkiController(PaymentService paymentService)
        {
            _paymentService = paymentService;
        }

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
            var cms = PkiProvider.GetCMS(loginRequest.Cms);
            var randomArrayFromSession = HttpContext.Session.Get("RandomString");

            byte[] randomArrayFromCms;

            try
            {
                randomArrayFromCms = PkiProvider.VerifySignature(cms);
            }
            catch (Exception err)
            {
                return BadRequest();
            }

            if (!randomArrayFromSession.SequenceEqual(randomArrayFromCms)) return BadRequest();

            var user = _paymentService.GetUser(loginRequest.ObjectId);

            _paymentService.GenerateUserPayments(user.Id);
            
            var claims = new List<Claim>
            {
                new Claim("UserId", user.Id.ToString()),
                new Claim("UserName", user.UserName),
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

        [Route("registercomplete")]
        [HttpPost]
        public IActionResult RegisterComplete([FromBody] CmsRequest loginRequest)
        {
            var res = PkiProvider.GetCMS(loginRequest.Cms);

            byte[] signedResult;

            try
            {
                signedResult = PkiProvider.VerifySignature(res);
            }
            catch (Exception err)
            {
                return BadRequest();
            }

            var byteArr = signedResult.Select(Convert.ToChar);
            var certificateId = string.Join("", byteArr);

            if (string.IsNullOrEmpty(certificateId) || string.IsNullOrWhiteSpace(certificateId)) return BadRequest();

            var lst = PkiProvider.GetSignersCommonNames(res);

            if (lst.Count != 1) return BadRequest();

            var commonName = lst.Dequeue();

            _paymentService.Register(commonName, certificateId);

            return Ok();
        }
    }

    public class CmsRequest
    {
        public string Cms { get; set; }
        public string ObjectId { get; set; }
    }
}