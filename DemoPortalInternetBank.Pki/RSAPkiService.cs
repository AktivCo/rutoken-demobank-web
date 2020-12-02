using System;
using Org.BouncyCastle.Crypto;
using Org.BouncyCastle.Crypto.Generators;
using Org.BouncyCastle.Security;
using Org.BouncyCastle.X509;

namespace DemoPortalInternetBank.Pki
{
    public class RSAPkiService : PkiService
    {
        private readonly int KEY_SIZE = 2048;

        protected override ISigner GetSigner()
        {
            throw new NotImplementedException();
        }

        protected override AsymmetricKeyParameter GetRootKey()
        {
            return (AsymmetricKeyParameter) RootCertificates.GetPrivateKeyRSA();
        }

        protected override X509Certificate GetRootCert()
        {
            return (X509Certificate) RootCertificates.GetRootCertRSA();
        }

        protected override X509Certificate GenerateCertificate(AsymmetricKeyParameter privateKey,
            X509V3CertificateGenerator certGen)
        {
            certGen.SetSignatureAlgorithm("SHA1withRSA");
            return certGen.Generate(privateKey);
        }

        protected override X509Crl GenerateCrl(AsymmetricKeyParameter privateKey, X509V2CrlGenerator crlGen)
        {
            crlGen.SetSignatureAlgorithm("SHA1withRSA");

            return crlGen.Generate(privateKey);
        }

        protected override AsymmetricCipherKeyPair GenerateKeyPair()
        {
            var keyGenerationParameters = new KeyGenerationParameters(new SecureRandom(), KEY_SIZE);
            var keyPairGenerator = new RsaKeyPairGenerator();
            keyPairGenerator.Init(keyGenerationParameters);
            return keyPairGenerator.GenerateKeyPair();
        }

        protected override string GetAlgoName()
        {
            return "RSA";
        }
    }
}