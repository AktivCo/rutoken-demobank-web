using Org.BouncyCastle.Asn1.CryptoPro;
using Org.BouncyCastle.Asn1.Rosstandart;
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
            algID = new AlgorithmIdentifier(RosstandartObjectIdentifiers.id_tc26_signwithdigest_gost_3410_12_256);
            
            this.privateKey = privateKey;
        }

        public IStreamCalculator CreateCalculator()
        {
            var param = new ParametersWithRandom(privateKey, new SecureRandom());

            var gst = new Gost3410DigestSigner(new ECGost3410Signer(), new Gost3411_2012_256Digest());

            gst.Init(true, param);

            return new DefaultSignatureCalculator(gst);
        }

        public object AlgorithmDetails => this.algID;
    }
}