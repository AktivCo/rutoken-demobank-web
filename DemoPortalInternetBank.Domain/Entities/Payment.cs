using System;

namespace DemoPortalInternetBank.Domain.Entities
{
    public class Payment
    {
        public int Id { get; set; }
        public int Amount { set; get; }
        public DateTime PaymentDate { get; set; }
        public int AccountId { get; set; }
        public Account Account { get; set; }

        public int UserId { get; set; }
        public User User { get; set; }

        public string CMS { get; set; }
    }
    
}