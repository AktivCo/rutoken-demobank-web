namespace DemoPortalInternetBank.Domain.Entities
{
    public class Bank
    {
        public int Id { get; set; }
        public string CheckingAccount { get; set; }
        public string BIK { get; set; }
        public Translation Translation { get; set; }
        public int? TranslationId { get; set; }
    }
}