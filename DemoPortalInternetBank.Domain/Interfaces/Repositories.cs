using DemoPortalInternetBank.Domain.Entities;
using DemoPortalInternetBank.Domain.Interfaces;

namespace DemoPortalInternetBank.Domain.Services
{
    public interface IUserRepository : IRepository<User>
    {
    }

    public class UserRepository : Repository<User>, IUserRepository
    {
        public UserRepository(EfDbContext context) : base(context)
        {
        }
    }

    public interface IBankRepository : IRepository<Bank>
    {
    }

    public class BankRepository : Repository<Bank>, IBankRepository
    {
        public BankRepository(EfDbContext context) : base(context)
        {
        }
    }

    public interface IRespondentRepository : IRepository<Respondent>
    {
    }

    public class RespondentRepository : Repository<Respondent>, IRespondentRepository
    {
        public RespondentRepository(EfDbContext context) : base(context)
        {
        }
    }

    public interface IAccountRepository : IRepository<Account>
    {
    }

    public class AccountRepository : Repository<Account>, IAccountRepository
    {
        public AccountRepository(EfDbContext context) : base(context)
        {
        }
    }
    public interface IPaymentRepository : IRepository<Payment>
    {
    }

    public class PaymentRepository : Repository<Payment>, IPaymentRepository
    {
        public PaymentRepository(EfDbContext context) : base(context)
        {
        }
    }

    public interface ITranslationRepository : IRepository<Translation>
    {
    }

    public class TranslationRepository : Repository<Translation>, ITranslationRepository
    {
        public TranslationRepository(EfDbContext context) : base(context)
        {
        }
    }
}