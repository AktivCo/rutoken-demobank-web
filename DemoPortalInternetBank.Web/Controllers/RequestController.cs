using DemoPortalInternetBank.Pki;
using DemoPortalInternetBank.Web.Models;
using Microsoft.AspNetCore.Mvc;

namespace DemoPortalInternetBank.Web.Controllers
{
    [Route("api")]
    public class RequestController : Controller
    {
        private readonly PkiManager _pkiManager;
        public RequestController(PkiManager pkiManager)
        {
            _pkiManager = pkiManager;
        }

        [Route("request")]
        [HttpPost]
        public IActionResult Register([FromBody] CmsRequest loginRequest)
        {
            var cert = _pkiManager.IssueCertificate(loginRequest.Cms, new AllReqExtensionBuilder());

            var pem = PemHelper.ToPem("CERTIFICATE", cert.GetEncoded());

            return Ok(pem);
        }
    }
}