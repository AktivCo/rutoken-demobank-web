namespace DemoPortalInternetBank.Domain.Entities
{
    public class Account
    {
        public int Id { get; set; }
        public Bank Bank { get; set; }
        public int BankId { get; set; }
        public Respondent Respondent { get; set; }
        public int RespondentId { get; set; }
        public string AccountNumber { get; set; }
    }
}