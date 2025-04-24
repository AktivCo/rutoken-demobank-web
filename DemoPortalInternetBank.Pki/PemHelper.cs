using System.IO;
using Org.BouncyCastle.Utilities.IO.Pem;
using PemReader = Org.BouncyCastle.OpenSsl.PemReader;
using PemWriter = Org.BouncyCastle.OpenSsl.PemWriter;

namespace DemoPortalInternetBank.Pki
{
    public class PemHelper
    {
        public static object FromPem(string cert)
        {
            object result;
            using (var _sr = new StringReader(cert))
            {
                var pRd = new PemReader(_sr);
                result = pRd.ReadObject();
                pRd.Reader.Close();
            }

            return result;
        }

        public static string ToPem(string type, byte[] encoded)
        {
            using (var writer = new StringWriter())
            {
                var pemObject = new PemObject(type, encoded);
                var pemWriter = new PemWriter(writer);

                pemWriter.WriteObject(pemObject);

                return writer.ToString();
            }
        }
    }
}