namespace DemoPortalInternetBank.Domain.Entities
{
    public class Respondent
    {
        public int Id { get; set; }
        public string Inn { get; set; }
        public string Kpp { get; set; }
        public bool Protected { get; set; }
        public Translation Translation { get; set; }
        public int? TranslationId { get; set; }
    }
}