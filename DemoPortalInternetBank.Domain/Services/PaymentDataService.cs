namespace DemoPortalInternetBank.Domain.Services
{
    public interface IPaymentDataService
    {
        IBankRepository Banks { get; }
        IAccountRepository Accounts { get; }
        IPaymentRepository Payments { get; }
        IRespondentRepository Respondents { get; }
        IUserRepository Users { get; }
    }

    public class PaymentDataService : IPaymentDataService
    {
        private IAccountRepository _account;
        private IPaymentRepository _payment;
        private IBankRepository _bank;
        private IRespondentRepository _respondent;
        private IUserRepository _user;
        private readonly EfDbContext _context;

        public PaymentDataService(EfDbContext context)
        {
            _context = context;
        }

        public IAccountRepository Accounts =>
            _account ?? (_account = new AccountRepository(_context));

        public IPaymentRepository Payments =>
            _payment ?? (_payment = new PaymentRepository(_context));

        public IBankRepository Banks =>
            _bank ?? (_bank = new BankRepository(_context));

        public IRespondentRepository Respondents =>
            _respondent ?? (_respondent = new RespondentRepository(_context));

        public IUserRepository Users =>
            _user ?? (_user = new UserRepository(_context));
    }
}