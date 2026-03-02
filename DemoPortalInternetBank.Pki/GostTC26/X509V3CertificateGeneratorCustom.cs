using Org.BouncyCastle.Asn1;
using Org.BouncyCastle.Asn1.X509;
using Org.BouncyCastle.Crypto;
using Org.BouncyCastle.Math;
using Org.BouncyCastle.X509;
using System;

namespace DemoPortalInternetBank.Pki.GostTC26
{
    public class X509V3CertificateGeneratorCustom
    {
        private readonly X509ExtensionsGenerator extGenerator = new X509ExtensionsGenerator();

        private V3TbsCertificateGenerator tbsGen;

        public X509V3CertificateGeneratorCustom() 
        {
            tbsGen = new V3TbsCertificateGenerator();
        }

        public void SetSerialNumber(BigInteger serialNumber)
        {
            if (serialNumber.SignValue <= 0)
            {
                throw new ArgumentException("serial number must be a positive integer", "serialNumber");
            }

            tbsGen.SetSerialNumber(new DerInteger(serialNumber));
        }

        public void SetIssuerDN(X509Name issuer)
        {
            tbsGen.SetIssuer(issuer);
        }

        public void SetNotAfter(DateTime date)
        {
            tbsGen.SetEndDate(new Time(date));
        }

        public void SetNotBefore(DateTime date)
        {
            tbsGen.SetStartDate(new Time(date));
        }

        public void SetSubjectDN(X509Name subject)
        {
            tbsGen.SetSubject(subject);
        }

        public void SetPublicKey(AsymmetricKeyParameter publicKey)
        {
            tbsGen.SetSubjectPublicKeyInfo(SubjectPublicKeyInfoFactory.CreateSubjectPublicKeyInfo(publicKey));
        }

        public void SetPublicKeyCustom(AsymmetricKeyParameter publicKey, bool isDigestNull)
        {
            tbsGen.SetSubjectPublicKeyInfo(SubjectPublicKeyInfoFactoryCustom.CreateSubjectPublicKeyInfo(publicKey, isDigestNull));
        }

        public void AddExtension(DerObjectIdentifier oid, bool critical, Asn1Encodable extensionValue)
        {
            extGenerator.AddExtension(oid, critical, extensionValue);
        }

        public X509Certificate Generate(ISignatureFactory signatureCalculatorFactory)
        {
            tbsGen.SetSignature((AlgorithmIdentifier)signatureCalculatorFactory.AlgorithmDetails);
            if (!extGenerator.IsEmpty)
            {
                tbsGen.SetExtensions(extGenerator.Generate());
            }

            TbsCertificateStructure tbsCertificateStructure = tbsGen.GenerateTbsCertificate();
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
    }
}
