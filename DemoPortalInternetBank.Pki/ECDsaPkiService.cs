using System;
using System.IO;
using Org.BouncyCastle.Crypto;
using Org.BouncyCastle.Crypto.Generators;
using Org.BouncyCastle.Crypto.Operators;
using Org.BouncyCastle.Pkcs;
using Org.BouncyCastle.Security;
using Org.BouncyCastle.X509;
using Org.BouncyCastle.Crypto.Parameters;
using Org.BouncyCastle.Asn1.Sec;
using Org.BouncyCastle.Utilities.IO.Pem;
using Org.BouncyCastle.Asn1.Nist;
using Org.BouncyCastle.Crypto.Signers;
using DemoPortalInternetBank.Pki.GostTC26;


namespace DemoPortalInternetBank.Pki
{
    public class ECDsaPkiService : PkiService
    {
        protected override ISigner GetSigner()
        {
            var digest = DigestUtilities.GetDigest(NistObjectIdentifiers.IdAes256Cbc);// IdSha256
            var dsaSigner = new DsaDigestSigner(new ECDsaSigner(), digest);

            return dsaSigner;
        }

        protected override AsymmetricKeyParameter GetRootKey()
        {
            return (AsymmetricKeyParameter)RootCertificates.GetPrivateKeyECDsa();
        }

        protected override X509Certificate GetRootCert()
        {
            return (X509Certificate)RootCertificates.GetRootCertECDsa();
        }

        protected override X509Certificate GenerateCertificate(AsymmetricKeyParameter privateKey,
            X509V3CertificateGenerator certGen)
        {
            var signature = new Asn1SignatureFactory("SHA256withECDSA", privateKey);
            return certGen.Generate(signature);
        }

        protected override X509Certificate GenerateCertificate(AsymmetricKeyParameter privateKey,
            X509V3CertificateGeneratorCustom certGen)
        {
            var signature = new Asn1SignatureFactory("SHA256withECDSA", privateKey);
            return certGen.Generate(signature);
        }

        protected override X509Crl GenerateCrl(AsymmetricKeyParameter privateKey, X509V2CrlGenerator crlGen)
        {
            var signature = new Asn1SignatureFactory("SHA256withECDSA", privateKey);
            return crlGen.Generate(signature);
        }

        protected override AsymmetricCipherKeyPair GenerateKeyPair()
        {
            var x9 = SecNamedCurves.GetByOid(SecObjectIdentifiers.SecP256r1);
            var ec = new ECNamedDomainParameters(SecObjectIdentifiers.SecP256r1, x9.Curve, x9.G, x9.N, x9.H, x9.GetSeed());

            ECKeyPairGenerator kpg = new ECKeyPairGenerator("ECDSA");
            kpg.Init(new ECKeyGenerationParameters(ec, new SecureRandom()));

            AsymmetricCipherKeyPair pair = kpg.GenerateKeyPair();

            return pair;
        }

        public override string GetAlgoName()
        {
            return "ECDSA";
        }
    }
}
