using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Text.RegularExpressions;
using Org.BouncyCastle.Cms;
using Org.BouncyCastle.OpenSsl;
using Org.BouncyCastle.Pkcs;
using Org.BouncyCastle.Security;
using Org.BouncyCastle.X509;
using X509Certificate = Org.BouncyCastle.X509.X509Certificate;

namespace DemoPortalInternetBank.Pki
{
    public class PkiManager
    {
        public Queue<string> GetSignersCommonNames(CmsSignedData cms)
        {
            var lst = new Queue<string>();

            var store = cms.GetCertificates("COLLECTION");

            var signers = cms.GetSignerInfos();

            foreach (var sig in signers.GetSigners())
            {
                var signer = (SignerInformation) sig;

                foreach (var st in store.GetMatches(signer.SignerID))
                {
                    var crt = (X509Certificate) st;

                    var dn = crt.SubjectDN.ToString();

                    var regex = new Regex(@"^CN=|,\S.*");

                    var commonName = regex.Replace(dn, "");

                    lst.Enqueue(commonName);
                }
            }

            return lst;
        }

        public CmsSignedData GetCMS(string signature)
        {
            var base64Content =
                signature
                    .Replace("-----BEGIN CMS-----", "")
                    .Replace("-----END CMS-----", "")
                    .Replace("\r", "")
                    .Replace("\n", "");

            var decodedContent = Convert.FromBase64String(base64Content);

            var data = new CmsSignedData(decodedContent);

            return data;
        }

        public string GenerateRandom()
        {
            var symbols = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".ToCharArray();

            var r = new SecureRandom();

            var res = r.GenerateSeed(40);

            var result = new StringBuilder(symbols.Length);

            foreach (var b in res)
            {
                result.Append(symbols[b % symbols.Length]);
            }

            return result.ToString();
        }

        public X509Certificate IssueCertificate(
            string pkcs10Request,
            ExtensionBuilder extensionBuilder,
            string customDN = null
        )
        {
            Pkcs10CertificationRequest request;

            using (var _sr = new StringReader(pkcs10Request))
            {
                var pRd = new PemReader(_sr);
                request = (Pkcs10CertificationRequest) pRd.ReadObject();
                pRd.Reader.Close();
            }

            var isGost = request.SignatureAlgorithm.Algorithm.Id.Contains("1.2.643");

            PkiService service;

            if (isGost)
            {
                service = new GOSTPkiService();
            }
            else
            {
                service = new RSAPkiService();
            }

            return service.IssueCertificate(request, extensionBuilder, customDN);
        }

        public byte[] VerifySignature(CmsSignedData cms)
        {
            var isGost = false;

            var signer = cms.GetSignerInfos().GetSigners();

            foreach (var s in signer)
            {
                var sig = (SignerInformation) s;
                isGost = sig.DigestAlgOid.Contains("1.2.643");
            }

            PkiService service;

            if (isGost)
            {
                service = new GOSTPkiService();
            }
            else
            {
                service = new RSAPkiService();
            }
            
            return service.VerifySignature(cms);
        }


        public X509Crl CreateCrl(bool isGost = false)
        {
            
            PkiService service;
            
            if (isGost)
            {
                service = new GOSTPkiService();
            }
            else
            {
                service = new RSAPkiService();
            }
            
            return service.CreateCRL();
        }
    }
}