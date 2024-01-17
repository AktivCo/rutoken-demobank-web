using System;
using Org.BouncyCastle.Asn1;
using Org.BouncyCastle.Asn1.CryptoPro;
using Org.BouncyCastle.Asn1.EdEC;
using Org.BouncyCastle.Asn1.Oiw;
using Org.BouncyCastle.Asn1.Pkcs;
using Org.BouncyCastle.Asn1.Rosstandart;
using Org.BouncyCastle.Asn1.X509;
using Org.BouncyCastle.Asn1.X9;
using Org.BouncyCastle.Crypto;
using Org.BouncyCastle.Crypto.Parameters;
using Org.BouncyCastle.Math;
using Org.BouncyCastle.Math.EC;
using Org.BouncyCastle.Utilities;

namespace DemoPortalInternetBank.Pki.GostTC26
{
    internal class SubjectPublicKeyInfoFactoryCustom
    {
        public static SubjectPublicKeyInfo CreateSubjectPublicKeyInfo(AsymmetricKeyParameter publicKey, bool isDigestNull = false)
        {
            if (publicKey == null)
            {
                throw new ArgumentNullException("publicKey");
            }

            if (publicKey.IsPrivate)
            {
                throw new ArgumentException("Private key passed - public key expected.", "publicKey");
            }

            if (publicKey is ECPublicKeyParameters)
            {
                ECPublicKeyParameters eCPublicKeyParameters = (ECPublicKeyParameters)publicKey;
                if (eCPublicKeyParameters.Parameters is ECGost3410Parameters)
                {
                    ECGost3410Parameters eCGost3410Parameters = (ECGost3410Parameters)eCPublicKeyParameters.Parameters;
                    BigInteger bigInteger = eCPublicKeyParameters.Q.AffineXCoord.ToBigInteger();
                    BigInteger bI = eCPublicKeyParameters.Q.AffineYCoord.ToBigInteger();
                    bool num = bigInteger.BitLength > 256;
                    Asn1Encodable qq;
                    var digest = isDigestNull ? null : eCGost3410Parameters.DigestParamSet;
                    Gost3410PublicKeyAlgParametersCustom parameters5 = new Gost3410PublicKeyAlgParametersCustom(eCGost3410Parameters.PublicKeyParamSet, digest, eCGost3410Parameters.EncryptionParamSet);
                    int num2;
                    int offSet;
                    DerObjectIdentifier algorithm;
                    if (num)
                    {
                        num2 = 128;
                        offSet = 64;
                        algorithm = RosstandartObjectIdentifiers.id_tc26_gost_3410_12_512;
                    }
                    else
                    {
                        num2 = 64;
                        offSet = 32;
                        algorithm = RosstandartObjectIdentifiers.id_tc26_gost_3410_12_256;
                    }

                    byte[] array = new byte[num2];
                    ExtractBytes(array, num2 / 2, 0, bigInteger);
                    ExtractBytes(array, num2 / 2, offSet, bI);
                    return new SubjectPublicKeyInfo(new AlgorithmIdentifier(algorithm, parameters5), new DerOctetString(array));
                }

                if (eCPublicKeyParameters.AlgorithmName == "ECGOST3410")
                {
                    if (eCPublicKeyParameters.PublicKeyParamSet == null)
                    {
                        throw new NotImplementedException("Not a CryptoPro parameter set");
                    }

                    ECPoint eCPoint = eCPublicKeyParameters.Q.Normalize();
                    BigInteger bI2 = eCPoint.AffineXCoord.ToBigInteger();
                    BigInteger bI3 = eCPoint.AffineYCoord.ToBigInteger();
                    byte[] array2 = new byte[64];
                    ExtractBytes(array2, 0, bI2);
                    ExtractBytes(array2, 32, bI3);
                    Gost3410PublicKeyAlgParameters gost3410PublicKeyAlgParameters = new Gost3410PublicKeyAlgParameters(eCPublicKeyParameters.PublicKeyParamSet, CryptoProObjectIdentifiers.GostR3411x94CryptoProParamSet);
                    return new SubjectPublicKeyInfo(new AlgorithmIdentifier(CryptoProObjectIdentifiers.GostR3410x2001, gost3410PublicKeyAlgParameters.ToAsn1Object()), new DerOctetString(array2));
                }

                X962Parameters x962Parameters;
                if (eCPublicKeyParameters.PublicKeyParamSet == null)
                {
                    ECDomainParameters parameters6 = eCPublicKeyParameters.Parameters;
                    x962Parameters = new X962Parameters(new X9ECParameters(parameters6.Curve, parameters6.G, parameters6.N, parameters6.H, parameters6.GetSeed()));
                }
                else
                {
                    x962Parameters = new X962Parameters(eCPublicKeyParameters.PublicKeyParamSet);
                }

                byte[] encoded = eCPublicKeyParameters.Q.GetEncoded(compressed: false);
                return new SubjectPublicKeyInfo(new AlgorithmIdentifier(X9ObjectIdentifiers.IdECPublicKey, x962Parameters.ToAsn1Object()), encoded);
            }

            if (publicKey is Gost3410PublicKeyParameters)
            {
                Gost3410PublicKeyParameters gost3410PublicKeyParameters = (Gost3410PublicKeyParameters)publicKey;
                if (gost3410PublicKeyParameters.PublicKeyParamSet == null)
                {
                    throw new NotImplementedException("Not a CryptoPro parameter set");
                }

                byte[] array3 = gost3410PublicKeyParameters.Y.ToByteArrayUnsigned();
                byte[] array4 = new byte[array3.Length];
                for (int i = 0; i != array4.Length; i++)
                {
                    array4[i] = array3[array3.Length - 1 - i];
                }

                Gost3410PublicKeyAlgParameters gost3410PublicKeyAlgParameters2 = new Gost3410PublicKeyAlgParameters(gost3410PublicKeyParameters.PublicKeyParamSet, CryptoProObjectIdentifiers.GostR3411x94CryptoProParamSet);
                return new SubjectPublicKeyInfo(new AlgorithmIdentifier(CryptoProObjectIdentifiers.GostR3410x94, gost3410PublicKeyAlgParameters2.ToAsn1Object()), new DerOctetString(array4));
            }

            throw new ArgumentException("Class provided no convertible: " + publicKey.GetType().FullName);
        }

        private static void ExtractBytes(byte[] encKey, int size, int offSet, BigInteger bI)
        {
            byte[] array = bI.ToByteArray();
            if (array.Length < size)
            {
                byte[] array2 = new byte[size];
                Array.Copy(array, 0, array2, array2.Length - array.Length, array.Length);
                array = array2;
            }

            for (int i = 0; i != size; i++)
            {
                encKey[offSet + i] = array[array.Length - 1 - i];
            }
        }

        private static void ExtractBytes(byte[] encKey, int offset, BigInteger bI)
        {
            byte[] array = bI.ToByteArray();
            int num = (bI.BitLength + 7) / 8;
            for (int i = 0; i < num; i++)
            {
                encKey[offset + i] = array[array.Length - 1 - i];
            }
        }
    }
}
