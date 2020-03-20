namespace DemoPortalInternetBank.Pki
{
    public static class RootCertificates
    {
        public static object GetRootCertGOST()
        {
            const string pem = @"-----BEGIN CERTIFICATE-----
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
            const string pem = @"-----BEGIN PRIVATE KEY-----
MIGVAgEAMBQGByqGSM49AgEGCSqFAwcBAgEBAQR6MHgCAQEEIAIrJgzELS7HsCQ5
D1iUFbxe6lBfzJ7uuMK8qX6FOx8GoAsGCSqFAwcBAgEBAaFEA0IABKmbTdTXfI0c
kTW472CmfmP9BFP9mLd5gIATUcb8sDhyxGC5aUI2jNrPQmmg5LEVvHY7YnDVs9WQ
xHIY7kcvTlI=
-----END PRIVATE KEY-----
";

            return PemHelper.FromPem(pem);
        }
        public static object GetRootCertRSA()
        {
            const string pem = @"-----BEGIN CERTIFICATE-----
MIICuDCCAaACCQDwSmifVyf0CDANBgkqhkiG9w0BAQUFADAeMRwwGgYDVQQDDBNU
ZXN0IENBIENlcnRpZmljYXRlMB4XDTIwMDMwNDEyMjIzNFoXDTMwMDMwNDEyMjIz
NFowHjEcMBoGA1UEAwwTVGVzdCBDQSBDZXJ0aWZpY2F0ZTCCASIwDQYJKoZIhvcN
AQEBBQADggEPADCCAQoCggEBAJLJGXDXv2A94ihMYs6UQ5MRp1ONWe+hzOf/lHn7
0UxYrSoHpHZmueFuq3sQCQlkCnD4ARcxu9POszBYlm80yo/NG7S7jPi7ajxCxQwO
WixcKxFZL4qPORAJM6BpNCa6cboSZS6PF0ccIPOHepUlP5vUS2Zi6xtAMg9AKuaf
KKr9mpPC6mu5Vsh6XQqFdJevagJkPdNW6BMi3i1SZY3fG5dXw/RNGwp7f/8VvweX
RJQuMgl9vh9JILWXU+sp/MNhNZAgkzSxM1gl3dzbbcp9JKbZmkA6pv3hZAV2nRKs
pIbH+kFvCGAZOp8TdgWyAni+HdLmisltZIVnj/eHqWWZaqkCAwEAATANBgkqhkiG
9w0BAQUFAAOCAQEAKDSk/pPPuwkvjzBbGrJxTv/2TrMHDjlrkvennLOknjV5E6pQ
hVLVHhXy+OAUZhEbbyhd5bilqA3I5edcdS3A84AM49AfsY5AXig0wp9/butqt+w5
/j9KNZgQs7zwKgYe01N/3Oz/QjmRrwfrnJ7wdmGo9KVemcJJeUQrFdibxnaCKzAd
IccayidRAxvzPAmwZ9046P0WJN/c9DKrtfNBB0DDM6XpMkRkY4oBfqgYS+nd4OrP
x3FhhMUcVi/hd7iRAy14EA+/vRkK33+y8HjeSKxPjiSFlvoIOh9L6h19/mtW/00/
O3E5nVDbzzhIGhxPTjffkOH+4+1yIHD2c/j9vw==
-----END CERTIFICATE-----";

            return PemHelper.FromPem(pem);
        }
        public static object GetPrivateKeyRSA()
        {
            const string pem = @"-----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCSyRlw179gPeIo
TGLOlEOTEadTjVnvoczn/5R5+9FMWK0qB6R2Zrnhbqt7EAkJZApw+AEXMbvTzrMw
WJZvNMqPzRu0u4z4u2o8QsUMDlosXCsRWS+KjzkQCTOgaTQmunG6EmUujxdHHCDz
h3qVJT+b1EtmYusbQDIPQCrmnyiq/ZqTwupruVbIel0KhXSXr2oCZD3TVugTIt4t
UmWN3xuXV8P0TRsKe3//Fb8Hl0SULjIJfb4fSSC1l1PrKfzDYTWQIJM0sTNYJd3c
223KfSSm2ZpAOqb94WQFdp0SrKSGx/pBbwhgGTqfE3YFsgJ4vh3S5orJbWSFZ4/3
h6llmWqpAgMBAAECggEAAPdHotoaEE0pZ9YeqoSfQZTeVzOB1i+uB1XmgJhz/rBC
Vl9gryPfX3RnWZLgtocbdh59I1k1hto0o6qgHnELOJE3hAD1C837j+WX3C6h0I1H
z6M7s2ct4POujL718OV8G4+Ks6R2JO94RSH+YCcQx7rUdaXYRMZd6w6u3H/W5tqa
ijBlVnd9VFXe0bt3hpK3UK6VmwBh3NvCBaN41eBMz+yatcDjR3usUFln+EUqFhyH
boZzrTN/SHRuWU599DHiOwtCBVccoryCpbbOnf7fzhdPu+ls46u3F/pgZGKquNF7
jpgzdrv67/mMLfUR8o7zR4HWK9qpCE5LEhOYg26p4QKBgQDab9dcU3SAlAAbLuvr
7H0759jnZ/anfNkgg/NlxYO2PI1Ye1CiICuctdxISPbd/tGxPI/GLpJKs19osKkt
T7BC5Ewp5KiUEFgl5/jpKYUTRjDbR9iP1/WO/QViPshUUcLyuYFX2F0Hew/SR4Vy
IePoBFkL/pwUEB1mcOFTdbnWFwKBgQCsBvryD8qR4kgIrVh2nxKfyHjtcAYpL6jy
y6sFdTpJKSraUNxYUT9jRdRBg3Ugbgjqe0x/6rqmVX2zliw0K7FzamgRwOY1R44V
nGLAzn3oAjV6JJeT6EKwvHQIMJ55vYhCoOUg+SvhypRiavocbn6tcNu3a8fwJ407
AZ0HFJ/9PwKBgQCpT7NQPue4mf8TEuWO8rmHa4f2peDLpbvuthg9NEGJSZoNkVfI
ssLbLyNVbCjdnZwPku+mH4cJG8vCK9yV4ISw9KAMgM4iJiENEKcgoywg6nEIJsI3
jJ8re/dmVV+V6+H9ncghvPUuzTZQOVu4QYiT2HrlDy8PZgZD1w7wT/oBdQKBgBfW
K8WIzJ/kQ+j35A8jwZfkVmVIJYJleTqTYBI0iSwECU0Q8UdHksn1rhCZ34vr005y
YUpEQzKzG+TbhSqBd2gvsVXsbbmqPZTfA4wF0MpqK/DNyzcSctM8ebN80Si7S3s4
AifMfvkdcewlOJzh7qmnvroutBih0l7/vTty7yxPAoGBAKVCYvUYhE3qSD9vhdAe
0ILArdxOwwZfPVN8LRXkN3crVkkcfJEPxo+o86bwU8X/OeGCDKJGWA3LAsmufIok
ZC94FN+5mSw0Brqd9IRdQjnA3KdF+97iiC7VLaBgWUSo9IVhX8k+xqrtDFuidFzg
FnZXpZNz56qWCJMXyAL+fbom
-----END PRIVATE KEY-----";

            return PemHelper.FromPem(pem);
        }
    }
}