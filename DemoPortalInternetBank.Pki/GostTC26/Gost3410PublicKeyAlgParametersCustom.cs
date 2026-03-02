using Org.BouncyCastle.Asn1;
using Org.BouncyCastle.Asn1.CryptoPro;
using Org.BouncyCastle.Crypto.Parameters;
using System;
using System.Collections.Generic;
using System.Text;

namespace DemoPortalInternetBank.Pki.GostTC26
{
    internal class Gost3410PublicKeyAlgParametersCustom : Asn1Encodable
    {
        private DerObjectIdentifier publicKeyParamSet;

        private DerObjectIdentifier digestParamSet;

        private DerObjectIdentifier encryptionParamSet;

        public DerObjectIdentifier PublicKeyParamSet => publicKeyParamSet;

        public DerObjectIdentifier DigestParamSet => digestParamSet;

        public DerObjectIdentifier EncryptionParamSet => encryptionParamSet;

        public static Gost3410PublicKeyAlgParametersCustom GetInstance(Asn1TaggedObject obj, bool explicitly)
        {
            return GetInstance(Asn1Sequence.GetInstance(obj, explicitly));
        }

        public static Gost3410PublicKeyAlgParametersCustom GetInstance(object obj)
        {
            if (obj == null || obj is Gost3410PublicKeyAlgParametersCustom)
            {
                return (Gost3410PublicKeyAlgParametersCustom)obj;
            }

            return new Gost3410PublicKeyAlgParametersCustom(Asn1Sequence.GetInstance(obj));
        }

        public Gost3410PublicKeyAlgParametersCustom(DerObjectIdentifier publicKeyParamSet)
            : this(publicKeyParamSet, null, null)
        {
        }

        public Gost3410PublicKeyAlgParametersCustom(DerObjectIdentifier publicKeyParamSet, DerObjectIdentifier digestParamSet)
            : this(publicKeyParamSet, digestParamSet, null)
        {
        }

        public Gost3410PublicKeyAlgParametersCustom(DerObjectIdentifier publicKeyParamSet, DerObjectIdentifier digestParamSet, DerObjectIdentifier encryptionParamSet)
        {
            if (publicKeyParamSet == null)
            {
                throw new ArgumentNullException("publicKeyParamSet");
            }

            this.publicKeyParamSet = publicKeyParamSet;
            this.digestParamSet = digestParamSet;
            this.encryptionParamSet = encryptionParamSet;
        }

        public Gost3410PublicKeyAlgParametersCustom(Asn1Sequence seq)
        {
            publicKeyParamSet = (DerObjectIdentifier)seq[0];
            if (seq.Count > 1)
            {
                digestParamSet = (DerObjectIdentifier)seq[1];
            }
            if (seq.Count > 2)
            {
                encryptionParamSet = (DerObjectIdentifier)seq[2];
            }
        }

        public override Asn1Object ToAsn1Object()
        {
            Asn1EncodableVector asn1EncodableVector = new Asn1EncodableVector(publicKeyParamSet);
            if (digestParamSet != null)
            {
                asn1EncodableVector.Add(digestParamSet);
            }
            if (encryptionParamSet != null)
            {
                asn1EncodableVector.Add(encryptionParamSet);
            }

            return new DerSequence(asn1EncodableVector);
        }
    }
}
