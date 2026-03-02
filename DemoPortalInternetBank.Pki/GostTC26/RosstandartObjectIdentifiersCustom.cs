using Org.BouncyCastle.Asn1;
using Org.BouncyCastle.Asn1.Rosstandart;
using System;
using System.Collections.Generic;
using System.Text;

namespace DemoPortalInternetBank.Pki.GostTC26
{
    internal abstract class RosstandartObjectIdentifiersCustom : RosstandartObjectIdentifiers
    {
        public static readonly DerObjectIdentifier id_tc26_gost_3410_12_256_paramSetB = id_tc26_gost_3410_12_256_paramSet.Branch("2");

        public static readonly DerObjectIdentifier id_tc26_gost_3410_12_256_paramSetC = id_tc26_gost_3410_12_256_paramSet.Branch("3");

        public static readonly DerObjectIdentifier id_tc26_gost_3410_12_256_paramSetD = id_tc26_gost_3410_12_256_paramSet.Branch("4");
    }
}
