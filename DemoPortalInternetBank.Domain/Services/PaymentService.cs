using System;
using System.Linq;
using System.Collections.Generic;
using DemoPortalInternetBank.Domain.Entities;
using DemoPortalInternetBank.Domain.Interfaces;

namespace DemoPortalInternetBank.Domain.Services
{
    public class PaymentService
    {
        private readonly IPaymentDataService _paymentDataService;
        private readonly IDbTransactionService _dbTransactionService;

        public PaymentService(IPaymentDataService paymentDataService, IDbTransactionService dbTransactionService)
        {
            _paymentDataService = paymentDataService;
            _dbTransactionService = dbTransactionService;
        }

        public void GenerateUserPayments(int userId)
        {
            const int PAYMENTS = 15;
            const int MIN_PROTECTED_PAYMENTS = 3;
            const int MAX_PROTECTED_PAYMENTS = 7;

            var rnd = new Random();

            _paymentDataService.Respondents.GetAll().ToList();

            var accounts = _paymentDataService.Accounts.GetAll().ToList();

            var accountIdsLength = accounts.Count();

            var payments =
                _paymentDataService.Payments
                    .GetAll()
                    .Where(p => p.UserId == userId && p.CMS == null)
                    .ToList();


            var paymentsCountToAdd = PAYMENTS - payments.Count();
            var protectedPayments = payments.Count(x => x.Account.Respondent.Protected);

            var list = new List<Payment>();

            for (var i = 0; i < paymentsCountToAdd; i++)
            {
                var accountIndex = rnd.Next(0, accountIdsLength - 1);

                var amount = rnd.Next(2500, 10000);

                var account = accounts[accountIndex];

                if (protectedPayments < MIN_PROTECTED_PAYMENTS && !account.Respondent.Protected)
                {
                    i--;
                    continue;
                }

                if (account.Respondent.Protected)
                {
                    protectedPayments++;
                }

                if (protectedPayments > MAX_PROTECTED_PAYMENTS && account.Respondent.Protected)
                {
                    i--;
                    continue;
                }

                var payment = new Payment
                {
                    UserId = userId,
                    AccountId = account.Id,
                    PaymentDate = DateTime.Now,
                    Amount = amount,
                };

                list.Add(payment);
            }

            var paymentsArray = list.OrderBy(x => rnd.Next()).ToArray();

            _paymentDataService.Payments.AddRange(paymentsArray);

            _dbTransactionService.Commit();
        }

        public List<Payment> GetPayments(int userId, bool isPayment = false)
        {
            _paymentDataService.Translations.GetAll().ToList();

            var payments =
                _paymentDataService.Payments.GetAll()
                    .Where(p => p.UserId == userId && (!isPayment ? p.CMS == null : p.CMS != null))
                    .AsQueryable();

            var paymentsWthAccounts =
                payments
                    .Join(_paymentDataService.Accounts.GetAll(),
                        (payment) => payment.AccountId,
                        account => account.Id,
                        (payment, account) => new
                        {
                            payment,
                            account
                        })
                    .AsQueryable();

            var paymentWthBanks =
                paymentsWthAccounts
                    .Join(_paymentDataService.Banks.GetAll(),
                        payment => payment.account.BankId,
                        bank => bank.Id,
                        (payment, bank) => new
                        {
                            account = payment.account,
                            payment = payment.payment,
                            bank
                        })
                    .AsQueryable();

            var paymentWthRespondents =
                paymentWthBanks
                    .Join(_paymentDataService.Respondents.GetAll(),
                        account => account.account.RespondentId,
                        respondent => respondent.Id,
                        (payment, respondent) => new
                        {
                            account = payment.account,
                            payment = payment.payment,
                            bank = payment.bank,
                            respondent
                        })
                    .AsQueryable();

            var result = paymentWthRespondents.AsEnumerable().Select(x =>
            {
                x.payment.Account = x.account;
                return x.payment;
            });

            return result.OrderByDescending(x => x.Id).ToList();
        }

        public void Register(string userName, string certificateId)
        {
            using (_dbTransactionService.Database.BeginTransaction())
            {
                var user = new User
                {
                    UserName = userName,
                    CertificateId = certificateId
                };

                _paymentDataService.Users.Add(user);

                _dbTransactionService.Commit();

                try
                {
                    _dbTransactionService.Database.CommitTransaction();
                }
                catch
                {
                    _dbTransactionService.Database.RollbackTransaction();
                }
            }
        }

        public User GetUser(string certificateId)
        {
            var user = _paymentDataService.Users.GetAll().FirstOrDefault(u => u.CertificateId == certificateId);

            if (user == null) throw new Exception();

            return user;
        }

        public void SavePayment(int userId, Payment payment)
        {
            payment.UserId = userId;

            _paymentDataService.Payments.Update(payment);

            _dbTransactionService.Commit();
        }
    }
}