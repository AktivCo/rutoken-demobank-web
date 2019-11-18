using System;
using System.IO;
using System.Linq;
using System.Text;
using Org.BouncyCastle.Asn1.CryptoPro;
using Org.BouncyCastle.Asn1.X509;
using Org.BouncyCastle.Cms;
using Org.BouncyCastle.Crypto;
using Org.BouncyCastle.Crypto.Digests;
using Org.BouncyCastle.Crypto.Generators;
using Org.BouncyCastle.Crypto.Parameters;
using Org.BouncyCastle.Crypto.Signers;
using Org.BouncyCastle.Math;
using Org.BouncyCastle.OpenSsl;
using Org.BouncyCastle.Pkcs;
using Org.BouncyCastle.Security;
using Org.BouncyCastle.X509;
using Org.BouncyCastle.X509.Extension;


namespace DemoPortalInternetBank.Pki
{
    public static class PkiProvider
    {
        public static (AsymmetricCipherKeyPair, X509Certificate) GenerateSelfSigned()
        {
            var startDate = DateTime.Now; // time from which certificate is valid
            var expiryDate = DateTime.Now; // time after which certificate is not valid
            var serialNumber = new BigInteger("1234567890"); // serial number for certificate

            var oid = ECGost3410NamedCurves.GetOid("Tc26-Gost-3410-12-256-paramSetA");
            var param = new ECKeyGenerationParameters(oid, new SecureRandom());
            var engine = new ECKeyPairGenerator();

            engine.Init(param);

            var keyPair = engine.GenerateKeyPair();

            var certGen = new X509V1CertificateGenerator();

            
            var dnName = new X509Name("CN=Test CA Certificate");

            certGen.SetSerialNumber(serialNumber);
            certGen.SetIssuerDN(dnName);
            certGen.SetNotBefore(startDate);
            certGen.SetNotAfter(expiryDate);
            certGen.SetSubjectDN(dnName);
            certGen.SetPublicKey(keyPair.Public);

            var signer = new GostSignerFactory(keyPair.Private);

            var certificate = certGen.Generate(signer);

            return (keyPair, certificate);
        }


        public static X509Certificate IssueCertificate(string pkcs10Request)
        {
            Pkcs10CertificationRequest request;

            using (var _sr = new StringReader(pkcs10Request))
            {
                var pRd = new PemReader(_sr);
                request = (Pkcs10CertificationRequest) pRd.ReadObject();
                pRd.Reader.Close();
            }

            var caCert = (X509Certificate) RootCertificates.GetRootCertGOST();
            var caKey = (AsymmetricKeyParameter) RootCertificates.GetPrivateKeyGOST();


            DateTime startDate = DateTime.Now;
            DateTime expiryDate = DateTime.Now;
            BigInteger serialNumber = new BigInteger("1234567890"); // serial number for certificate

            X509V3CertificateGenerator certGen = new X509V3CertificateGenerator();

            var requestInfo = request.GetCertificationRequestInfo();

            certGen.SetSerialNumber(serialNumber);
            certGen.SetIssuerDN(caCert.SubjectDN);
            certGen.SetNotBefore(startDate);
            certGen.SetNotAfter(expiryDate);

            certGen.SetSubjectDN(requestInfo.Subject);
            certGen.SetPublicKey(request.GetPublicKey());

            /// extensions
            certGen.AddExtension(X509Extensions.AuthorityKeyIdentifier, false,
                new AuthorityKeyIdentifierStructure(caCert));
            certGen.AddExtension(X509Extensions.SubjectKeyIdentifier, false,
                new SubjectKeyIdentifierStructure(request.GetPublicKey()));


            var signer = new GostSignerFactory(caKey);

            var certificate = certGen.Generate(signer);

            return certificate;
        }


        public static bool VerifySignature(string signature, string stringToHash)
        {
            var base64Content = signature.Replace("-----BEGIN CMS-----", "").Replace("-----END CMS-----", "")
                .Replace("\r", "").Replace("\n", "");

            var decodedContent = Convert.FromBase64String(base64Content);

            var data = new CmsSignedData(decodedContent);

            var store = data.GetCertificates("COLLECTION");

            var signers = data.GetSignerInfos();

            foreach (var sig in signers.GetSigners())
            {
                var signer = (SignerInformation) sig;

                foreach (var st in store.GetMatches(signer.SignerID))
                {
                    var crt = (X509Certificate) st;

                    var gst = new Gost3410DigestSigner(new ECGost3410Signer(), new Gost3411_2012_256Digest());

                    gst.Init(false, crt.GetPublicKey());

                    var arr = stringToHash.Select(Convert.ToByte).ToArray();

                    gst.BlockUpdate(arr, 0, arr.Length);

                    var t = gst.VerifySignature(signer.GetSignature());

                    if (!t) return false;
                }
            }

            return true;
        }

        public static string GenerateRandom()
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
    }
}