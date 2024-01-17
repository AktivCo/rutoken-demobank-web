using Org.BouncyCastle.Asn1;
using Org.BouncyCastle.Asn1.CryptoPro;
using Org.BouncyCastle.Asn1.Rosstandart;
using Org.BouncyCastle.Asn1.X509;
using Org.BouncyCastle.Crypto;
using Org.BouncyCastle.Crypto.Parameters;
using Org.BouncyCastle.Security;
using System.IO;
using System;
using Org.BouncyCastle.Math;

namespace DemoPortalInternetBank.Pki.GostTC26
{
    internal sealed class PublicKeyFactoryCustom
    {
        public static (AsymmetricKeyParameter, bool) CreateKey(SubjectPublicKeyInfo keyInfo, DerObjectIdentifier paramSet)
        {
            AlgorithmIdentifier algorithmID = keyInfo.AlgorithmID;
            DerObjectIdentifier algorithm = algorithmID.Algorithm;

            bool isDigestNull = false;

            if (algorithm.Equals(RosstandartObjectIdentifiers.id_tc26_gost_3410_12_256))
            {
                byte[] str = ((DerOctetString)Asn1Object.FromByteArray(keyInfo.PublicKeyData.GetOctets())).GetOctets();
                int num = 32;
                if (algorithm.Equals(RosstandartObjectIdentifiers.id_tc26_gost_3410_12_512))
                {
                    num = 64;
                }

                int num2 = 2 * num;
                byte[] array4 = new byte[1 + num2];
                array4[0] = 4;
                for (int m = 1; m <= num; m++)
                {
                    array4[m] = str[num - m];
                    array4[m + num] = str[num2 - m];
                }

                Gost3410PublicKeyAlgParametersCustom instance6;
                if (Asn1Sequence.GetInstance(keyInfo.AlgorithmID.Parameters).Count < 2)
                {
                    isDigestNull = true;
                    var digest = RosstandartObjectIdentifiers.id_tc26_gost_3411_12_256;
                    instance6 = new Gost3410PublicKeyAlgParametersCustom(paramSet, digest);
                }
                else
                {
                    instance6 = Gost3410PublicKeyAlgParametersCustom.GetInstance(keyInfo.AlgorithmID.Parameters);
                }
                ECGost3410Parameters eCGost3410Parameters = new ECGost3410Parameters(new ECNamedDomainParameters(instance6.PublicKeyParamSet, ECGost3410NamedCurvesCustom.GetByOid(instance6.PublicKeyParamSet)), instance6.PublicKeyParamSet, instance6.DigestParamSet, instance6.EncryptionParamSet);
                return (new ECPublicKeyParameters(eCGost3410Parameters.Curve.DecodePoint(array4), eCGost3410Parameters), isDigestNull);
            }

            throw new SecurityUtilityException("algorithm identifier in public key not recognised: " + algorithm);
        }
    }
}
