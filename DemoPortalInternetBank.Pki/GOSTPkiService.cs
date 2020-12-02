using Org.BouncyCastle.Asn1;
using Org.BouncyCastle.Asn1.CryptoPro;
using Org.BouncyCastle.Asn1.Rosstandart;
using Org.BouncyCastle.Crypto;
using Org.BouncyCastle.Crypto.Digests;
using Org.BouncyCastle.Crypto.Generators;
using Org.BouncyCastle.Crypto.Parameters;
using Org.BouncyCastle.Crypto.Signers;
using Org.BouncyCastle.Security;
using Org.BouncyCastle.X509;

namespace DemoPortalInternetBank.Pki
{
    public class GOSTPkiService : PkiService
    {
        protected override ISigner GetSigner()
        {
            return new Gost3410DigestSigner(new ECGost3410Signer(), new Gost3411_2012_256Digest());
        }

        protected override AsymmetricKeyParameter GetRootKey()
        {
            return (AsymmetricKeyParameter) RootCertificates.GetPrivateKeyGOST();
        }

        protected override X509Certificate GetRootCert()
        {
            return (X509Certificate) RootCertificates.GetRootCertGOST();
        }

        protected override X509Certificate GenerateCertificate(AsymmetricKeyParameter privateKey,
            X509V3CertificateGenerator certGen)
        {
            var signer = new GostSignerFactory(privateKey);
            return certGen.Generate(signer);
        }

        protected override X509Crl GenerateCrl(AsymmetricKeyParameter privateKey, X509V2CrlGenerator crlGen)
        {
            var signer = new GostSignerFactory(privateKey);

            return crlGen.Generate(signer);
        }

        protected override AsymmetricCipherKeyPair GenerateKeyPair()
        {
            DerObjectIdentifier oid = ECGost3410NamedCurves.GetOid("GostR3410-2001-CryptoPro-A");
            ECNamedDomainParameters ecp = new ECNamedDomainParameters(oid, ECGost3410NamedCurves.GetByOid(oid));
            ECGost3410Parameters gostParams =
                new ECGost3410Parameters(ecp, oid, RosstandartObjectIdentifiers.id_tc26_gost_3411_12_256, null);
            ECKeyGenerationParameters parameters = new ECKeyGenerationParameters(gostParams, new SecureRandom());
            ECKeyPairGenerator engine = new ECKeyPairGenerator();
            engine.Init(parameters);

            AsymmetricCipherKeyPair pair = engine.GenerateKeyPair();

            return pair;
        }

        protected override string GetAlgoName()
        {
            return "GOST";
        }
    }
}