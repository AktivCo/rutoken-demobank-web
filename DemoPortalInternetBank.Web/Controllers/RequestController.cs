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
        public IActionResult Register([FromBody] CmsRequest req)
        {
            var cert = _pkiManager.IssueCertificate(req.Cms, new AllReqExtensionBuilder(req.CrlLink, req.RootCertLink));

            var pem = PemHelper.ToPem("CERTIFICATE", cert.GetEncoded());

            return Ok(pem);
        }
    }
}