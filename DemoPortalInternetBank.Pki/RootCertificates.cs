namespace DemoPortalInternetBank.Pki
{
    public class RootCertificates
    {
        public static object GetRootCertGOST()
        {
            var pem = @"-----BEGIN CERTIFICATE-----
MIIBIjCBzwIESZYC0jALBgkqhQMHAQIBAQEwHjEcMBoGA1UEAwwTVGVzdCBDQSBD
ZXJ0aWZpY2F0ZTAeFw0xOTA5MjUxMTQ0NDZaFw0xOTA5MjUxMTQ0NDZaMB4xHDAa
BgNVBAMME1Rlc3QgQ0EgQ2VydGlmaWNhdGUwWjAUBgcqhkjOPQIBBgkqhQMHAQIB
AQEDQgAEqZtN1Nd8jRyRNbjvYKZ+Y/0EU/2Yt3mAgBNRxvywOHLEYLlpQjaM2s9C
aaDksRW8djticNWz1ZDEchjuRy9OUjALBgkqhQMHAQIBAQEDQQAsFZ2cAYXgO7F4
vDxv4DVeeta+3+B2/HAi8nwWvVkDKxaiVHPmiCs0MLKJgr5taEsfKmS7dmREuMca
4j4+ylpS
-----END CERTIFICATE-----
";

            return PemHelper.FromPem(pem);
        }

        public static object GetPrivateKeyGOST()
        {
            var pem = @"-----BEGIN PRIVATE KEY-----
MIGVAgEAMBQGByqGSM49AgEGCSqFAwcBAgEBAQR6MHgCAQEEIAIrJgzELS7HsCQ5
D1iUFbxe6lBfzJ7uuMK8qX6FOx8GoAsGCSqFAwcBAgEBAaFEA0IABKmbTdTXfI0c
kTW472CmfmP9BFP9mLd5gIATUcb8sDhyxGC5aUI2jNrPQmmg5LEVvHY7YnDVs9WQ
xHIY7kcvTlI=
-----END PRIVATE KEY-----
";

            return PemHelper.FromPem(pem);
        }

        public static string GetRootCertRSA()
        {
            return "";
        }

        public static string GetPrivateKeyRSA()
        {
            return "";
        }
    }
}