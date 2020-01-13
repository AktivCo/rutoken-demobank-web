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


namespace DemoPortalInternetBank.Web.Controllers
{
    class UserModel
    {
        public string FullName { get; set; }
        public string ObjectId { get; set; }
        public int Balance { get; set; }
    }

    [Route("api/user")]
    [Authorize(AuthenticationSchemes = CookieAuthenticationDefaults.AuthenticationScheme)]
    public class UserController : Controller
    {
        private readonly PaymentService _paymentService;

        public UserController(PaymentService paymentService)
        {
            _paymentService = paymentService;
        }

        [Route("info")]
        [HttpGet]
        // GET
        public IActionResult Index()
        {
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

            user.Balance = 1000000 - paymentsTotal;

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

            var res = PkiProvider.GetCMS(payment.CMS);

            try
            {
                PkiProvider.VerifySignature(res);
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

                var res = PkiProvider.GetCMS(payment.CMS);

                try
                {
                    PkiProvider.VerifySignature(res);
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