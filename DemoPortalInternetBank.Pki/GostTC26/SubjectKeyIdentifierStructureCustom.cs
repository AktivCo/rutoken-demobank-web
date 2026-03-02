using Org.BouncyCastle.Asn1;
using Org.BouncyCastle.Asn1.X509;
using Org.BouncyCastle.Crypto;
using Org.BouncyCastle.Security.Certificates;
using Org.BouncyCastle.X509.Extension;
using Org.BouncyCastle.X509;
using System;
using System.Collections.Generic;
using System.Text;

namespace DemoPortalInternetBank.Pki.GostTC26
{
    internal class SubjectKeyIdentifierStructureCustom : SubjectKeyIdentifier
    {
        public SubjectKeyIdentifierStructureCustom(Asn1OctetString encodedValue)
    : base((Asn1OctetString)X509ExtensionUtilities.FromExtensionValue(encodedValue))
        {
        }

        private static Asn1OctetString FromPublicKey(AsymmetricKeyParameter pubKey)
        {
            try
            {
                return (Asn1OctetString)new SubjectKeyIdentifier(SubjectPublicKeyInfoFactoryCustom.CreateSubjectPublicKeyInfo(pubKey)).ToAsn1Object();
            }
            catch (Exception ex)
            {
                throw new CertificateParsingException("Exception extracting certificate details: " + ex.ToString());
            }
        }

        public SubjectKeyIdentifierStructureCustom(AsymmetricKeyParameter pubKey)
            : base(FromPublicKey(pubKey))
        {
        }
    }
}
