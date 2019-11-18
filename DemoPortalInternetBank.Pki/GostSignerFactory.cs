using Org.BouncyCastle.Asn1.CryptoPro;
using Org.BouncyCastle.Asn1.X509;
using Org.BouncyCastle.Crypto;
using Org.BouncyCastle.Crypto.Digests;
using Org.BouncyCastle.Crypto.Operators;
using Org.BouncyCastle.Crypto.Parameters;
using Org.BouncyCastle.Crypto.Signers;
using Org.BouncyCastle.Security;

namespace DemoPortalInternetBank.Pki
{
    public class GostSignerFactory : ISignatureFactory
    {
        private AlgorithmIdentifier algID;
        private AsymmetricKeyParameter privateKey;

        public GostSignerFactory(AsymmetricKeyParameter privateKey)
        {
            var oid = ECGost3410NamedCurves.GetOid("Tc26-Gost-3410-12-256-paramSetA");
            algID = new AlgorithmIdentifier(oid);
            this.privateKey = privateKey;
        }

        public IStreamCalculator CreateCalculator()
        {
            var param = new ParametersWithRandom(privateKey, new SecureRandom());
            var gst = new Gost3410DigestSigner(new ECGost3410Signer(), new Gost3411Digest());

            gst.Init(true, param);

            return new DefaultSignatureCalculator(gst);
        }

        public object AlgorithmDetails => this.algID;
    }
}