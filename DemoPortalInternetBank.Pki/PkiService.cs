using System;
using System.IO;
using System.Security.Cryptography;
using Org.BouncyCastle.Asn1.X509;
using Org.BouncyCastle.Cms;
using Org.BouncyCastle.Crypto;
using Org.BouncyCastle.Math;
using Org.BouncyCastle.Pkcs;
using Org.BouncyCastle.Security;
using Org.BouncyCastle.Utilities;
using Org.BouncyCastle.X509;
using Org.BouncyCastle.X509.Extension;

namespace DemoPortalInternetBank.Pki
{
    public abstract class PkiService
    {
        protected abstract ISigner GetSigner();

        private void CheckCertificateValidity(X509Certificate cert)
        {
            cert.CheckValidity();

            var caCert = GetRootCert();

            var gst = GetSigner();

            gst.Init(false, caCert.GetPublicKey());

            var tbsCertificate = cert.GetTbsCertificate();

            gst.BlockUpdate(tbsCertificate, 0, tbsCertificate.Length);

            var t = gst.VerifySignature(cert.GetSignature());

            if (!t) throw new CryptographicException("Cannot verify signature");
        }

        public byte[] VerifySignature(CmsSignedData cms)
        {
            var store = cms.GetCertificates("COLLECTION");

            var signers = cms.GetSignerInfos();

            byte[] arr;

            using (var stream = new MemoryStream())
            {
                cms.SignedContent.Write(stream);

                arr = stream.ToArray();
            }

            foreach (var sig in signers.GetSigners())
            {
                var signer = (SignerInformation) sig;

                foreach (var st in store.GetMatches(signer.SignerID))
                {
                    var crt = (X509Certificate) st;

                    CheckCertificateValidity(crt);

                    var gst = GetSigner();

                    gst.Init(false, crt.GetPublicKey());

                    gst.BlockUpdate(arr, 0, arr.Length);

                    var t = gst.VerifySignature(signer.GetSignature());

                    if (!t) throw new CryptographicException("Cannot verify signature");
                }
            }

            return arr;
        }

        public (AsymmetricCipherKeyPair, X509Certificate) GenerateSelfSigned()
        {
            var startDate = DateTime.Now;
            var expiryDate = DateTime.Now.AddYears(10);

            var serialNumber = BigIntegers.CreateRandomInRange(
                BigInteger.ValueOf(2).Pow(63),
                BigInteger.ValueOf(2).Pow(64),
                new SecureRandom()
            );

            var keyPair = GenerateKeyPair();

            var certGen = new X509V3CertificateGenerator();

            var dn = "ST=Moscow,L=Moscow,O=AO Aktiv-Soft,OU=Rutoken,CN=Rutoken TEST CA " + GetAlgoName();

            var dnName = new X509Name(dn);

            certGen.SetSerialNumber(serialNumber);
            certGen.SetIssuerDN(dnName);
            certGen.SetNotBefore(startDate);
            certGen.SetNotAfter(expiryDate);
            certGen.SetSubjectDN(dnName);
            certGen.SetPublicKey(keyPair.Public);
            
            certGen.AddExtension(X509Extensions.AuthorityKeyIdentifier, false,
                new AuthorityKeyIdentifierStructure(keyPair.Public));
            
            certGen.AddExtension(X509Extensions.SubjectKeyIdentifier, false,
                new SubjectKeyIdentifierStructure(keyPair.Public));
            
            certGen.AddExtension(X509Extensions.BasicConstraints, true, 
                new BasicConstraints(true));

            var certificate = GenerateCertificate(keyPair.Private, certGen);

            return (keyPair, certificate);
        }

        public X509Certificate IssueCertificate(
            Pkcs10CertificationRequest request,
            ExtensionBuilder extensionBuilder,
            string customDN = null
        )
        {
            var caCert = GetRootCert();
            var caKey = GetRootKey();

            var startDate = DateTime.Now;
            var expiryDate = DateTime.Now.AddYears(1);

            var serialNumber = BigIntegers.CreateRandomInRange(
                BigInteger.ValueOf(2).Pow(63),
                BigInteger.ValueOf(2).Pow(64),
                new SecureRandom()
            );

            var certGen = new X509V3CertificateGenerator();

            certGen.SetSerialNumber(serialNumber);
            certGen.SetIssuerDN(caCert.SubjectDN);
            certGen.SetNotBefore(startDate);
            certGen.SetNotAfter(expiryDate);
            certGen.SetPublicKey(request.GetPublicKey());

            if (!string.IsNullOrEmpty(customDN))
            {
                certGen.SetSubjectDN(new X509Name(customDN));
            }
            else
            {
                certGen.SetSubjectDN(request.GetCertificationRequestInfo().Subject);
            }

            extensionBuilder.Build(certGen, request, caCert);

            var x509Certificate = GenerateCertificate(caKey, certGen);

            return x509Certificate;
        }

        public X509Crl CreateCRL()
        {
            var caCert = GetRootCert();
            var caKey = GetRootKey();

            var crlGen = new X509V2CrlGenerator();
            crlGen.SetIssuerDN(caCert.IssuerDN);
            crlGen.SetThisUpdate(DateTime.Now);
            crlGen.SetNextUpdate(DateTime.Now.AddYears(1));

            crlGen.AddCrlEntry(BigInteger.One, DateTime.Now, CrlReason.PrivilegeWithdrawn);

            crlGen.AddExtension(
                X509Extensions.AuthorityKeyIdentifier,
                false,
                new AuthorityKeyIdentifierStructure(caCert)
            );

            crlGen.AddExtension(
                X509Extensions.CrlNumber,
                false,
                new CrlNumber(BigInteger.One)
            );

            var crl = GenerateCrl(caKey, crlGen);

            return crl;
        }

        protected abstract AsymmetricKeyParameter GetRootKey();
        protected abstract X509Certificate GetRootCert();

        protected abstract X509Certificate GenerateCertificate(
            AsymmetricKeyParameter privateKey,
            X509V3CertificateGenerator certGen
        );

        protected abstract X509Crl GenerateCrl(
            AsymmetricKeyParameter privateKey,
            X509V2CrlGenerator certGen);

        protected abstract AsymmetricCipherKeyPair GenerateKeyPair();
        protected abstract string GetAlgoName();
    }
}