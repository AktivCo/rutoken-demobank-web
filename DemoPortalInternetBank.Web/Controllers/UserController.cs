using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DemoPortalInternetBank.Domain.Entities;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using DemoPortalInternetBank.Domain.Services;
using DemoPortalInternetBank.Pki;
using DemoPortalInternetBank.Web.Models;

#if !DISABLE_DEMOBANK
namespace DemoPortalInternetBank.Web.Controllers
{
    [Route("api/user")]
    [Authorize(AuthenticationSchemes = CookieAuthenticationDefaults.AuthenticationScheme)]
    public class UserController : Controller
    {
        private readonly PaymentService _paymentService;
        private readonly PkiManager _pkiManager;

        public UserController(PaymentService paymentService, PkiManager pkiManager)
        {
            _paymentService = paymentService;
            _pkiManager = pkiManager;
        }

        [Route("pin/incorrect")]
        [HttpGet]
        public IActionResult PinInCorrect()
        {
            var token = new byte[0];
            HttpContext.Session.Set("PIN_INCORRECT", token);

            return Ok();
        }

        [Route("pin/correct")]
        [HttpGet]
        public IActionResult PinCorrect()
        {
            HttpContext.Session.Remove("PIN_INCORRECT");
            return Ok();
        }


        [Route("info")]
        [HttpGet]
        // GET
        public IActionResult Index()
        {
            const int USER_AVAILABLE_PAYMENTS_SUM = 1000000;
            
            var result = new byte[0];
            
            if (HttpContext.Session.TryGetValue("PIN_INCORRECT", out result))
            {
                return Unauthorized();
            }

            var user = new UserModel();

            foreach (var claim in User.Claims)
            {
                if (claim.Type == "UserName")
                {
                    user.FullName = claim.Value;
                }

                if (claim.Type == "ObjectId")
                {
                    user.ObjectId = claim.Value;
                }
            }

            var userId = int.Parse(User.Claims.First(u => u.Type == "UserId").Value);

            var paymentsTotal = _paymentService.GetPayments(userId, true).Sum(p => p.Amount);

            user.Balance = USER_AVAILABLE_PAYMENTS_SUM - paymentsTotal;

            return Ok(user);
        }

        [Route("payments/{type}")]
        public IActionResult GetPayments(int type)
        {
            var userId = int.Parse(User.Claims.First(u => u.Type == "UserId").Value);

            var payments = _paymentService.GetPayments(userId, isPayment: Convert.ToBoolean(type)).ToList();

            return Ok(payments);
        }

        [Route("payment/save")]
        [HttpPost]
        public IActionResult SavePayment([FromBody] Payment payment)
        {
            var userId = int.Parse(User.Claims.First(u => u.Type == "UserId").Value);

            var res = _pkiManager.GetCMS(payment.CMS);

            try
            {
                _pkiManager.VerifySignature(res);
            }
            catch (Exception err)
            {
                return BadRequest();
            }

            _paymentService.SavePayment(userId, payment);

            return Ok();
        }

        [Route("payments/save")]
        [HttpPost]
        public IActionResult SavePayment([FromBody] List<Payment> payments)
        {
            foreach (var payment in payments)
            {
                var userId = int.Parse(User.Claims.First(u => u.Type == "UserId").Value);

                var res = _pkiManager.GetCMS(payment.CMS);

                try
                {
                    new PkiManager().VerifySignature(res);
                }
                catch (Exception err)
                {
                    return BadRequest();
                }

                _paymentService.SavePayment(userId, payment);
            }

            return Ok();
        }

        [Route("logout")]
        [HttpGet]
        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);

            return Ok();
        }
    }
}
#endif