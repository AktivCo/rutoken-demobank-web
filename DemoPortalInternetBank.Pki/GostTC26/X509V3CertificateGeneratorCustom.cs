using Org.BouncyCastle.Asn1;
using Org.BouncyCastle.Asn1.X509;
using Org.BouncyCastle.Crypto;
using Org.BouncyCastle.Math;
using Org.BouncyCastle.X509;
using System;
using System.Collections.Generic;
using System.Text;

namespace DemoPortalInternetBank.Pki.GostTC26
{
    public class X509V3CertificateGeneratorCustom : X509V3CertificateGenerator
    {
        private readonly X509ExtensionsGenerator extGeneratorCustom = new X509ExtensionsGenerator();

        private V3TbsCertificateGenerator tbsGenCustom;

        public X509V3CertificateGeneratorCustom() 
        {
            tbsGenCustom = new V3TbsCertificateGenerator();
        }

        public void SetIssuerUniqueID(bool[] uniqueID)
        {
            tbsGenCustom.SetIssuerUniqueID(booleanToBitString(uniqueID));
        }

        public void SetSubjectUniqueID(bool[] uniqueID)
        {
            tbsGenCustom.SetSubjectUniqueID(booleanToBitString(uniqueID));
        }

        public void AddExtension(DerObjectIdentifier oid, bool critical, Asn1Encodable extensionValue)
        {
            extGeneratorCustom.AddExtension(oid, critical, extensionValue);
        }

        public void SetSubjectDN(X509Name subject)
        {
            tbsGenCustom.SetSubject(subject);
        }

        public void SetNotAfter(DateTime date)
        {
            tbsGenCustom.SetEndDate(new Time(date));
        }

        public void SetNotBefore(DateTime date)
        {
            tbsGenCustom.SetStartDate(new Time(date));
        }

        public void SetIssuerDN(X509Name issuer)
        {
            tbsGenCustom.SetIssuer(issuer);
        }

        public void SetSerialNumber(BigInteger serialNumber)
        {
            if (serialNumber.SignValue <= 0)
            {
                throw new ArgumentException("serial number must be a positive integer", "serialNumber");
            }

            tbsGenCustom.SetSerialNumber(new DerInteger(serialNumber));
        }

        public void SetPublicKey(AsymmetricKeyParameter publicKey)
        {
            tbsGenCustom.SetSubjectPublicKeyInfo(SubjectPublicKeyInfoFactory.CreateSubjectPublicKeyInfo(publicKey));
        }

        public void SetPublicKeyCustom(AsymmetricKeyParameter publicKey, bool isDigestNull)
        {
            tbsGenCustom.SetSubjectPublicKeyInfo(SubjectPublicKeyInfoFactoryCustom.CreateSubjectPublicKeyInfo(publicKey, isDigestNull));
        }

        public X509Certificate Generate(ISignatureFactory signatureCalculatorFactory)
        {
            tbsGenCustom.SetSignature((AlgorithmIdentifier)signatureCalculatorFactory.AlgorithmDetails);
            if (!extGeneratorCustom.IsEmpty)
            {
                tbsGenCustom.SetExtensions(extGeneratorCustom.Generate());
            }

            TbsCertificateStructure tbsCertificateStructure = tbsGenCustom.GenerateTbsCertificate();
            IStreamCalculator streamCalculator = signatureCalculatorFactory.CreateCalculator();
            byte[] derEncoded = tbsCertificateStructure.GetDerEncoded();
            streamCalculator.Stream.Write(derEncoded, 0, derEncoded.Length);
            streamCalculator.Stream.Dispose();
            return GenerateJcaObject(tbsCertificateStructure, (AlgorithmIdentifier)signatureCalculatorFactory.AlgorithmDetails, ((IBlockResult)streamCalculator.GetResult()).Collect());
        }

        private X509Certificate GenerateJcaObject(TbsCertificateStructure tbsCert, AlgorithmIdentifier sigAlg, byte[] signature)
        {
            return new X509Certificate(new X509CertificateStructure(tbsCert, sigAlg, new DerBitString(signature)));
        }

        private DerBitString booleanToBitString(bool[] id)
        {
            byte[] array = new byte[(id.Length + 7) / 8];
            for (int i = 0; i != id.Length; i++)
            {
                if (id[i])
                {
                    array[i / 8] |= (byte)(1 << 7 - i % 8);
                }
            }

            int num = id.Length % 8;
            if (num == 0)
            {
                return new DerBitString(array);
            }

            return new DerBitString(array, 8 - num);
        }
    }
}
