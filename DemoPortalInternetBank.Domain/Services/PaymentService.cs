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
            var paymentsCount =
                _paymentDataService.Payments.GetAll().Count(p => p.UserId == userId && p.CMS == null);

            var accountIds = _paymentDataService.Accounts.GetAll().Select(p => p.Id).ToArray();

            var respondentsIdsCount = accountIds.Length;

            var paymentsCountToAdd = 15 - paymentsCount;

            var rnd = new Random();

            for (var i = 0; i < paymentsCountToAdd; i++)
            {
                var respondentIndex = rnd.Next(0, respondentsIdsCount - 1);

                var amount = rnd.Next(2500, 10000);

                var respondentId = accountIds[respondentIndex];

                var payment = new Payment
                {
                    UserId = userId,
                    AccountId = respondentId,
                    PaymentDate = DateTime.Now,
                    Amount = amount,
                };

                _paymentDataService.Payments.Add(payment);
                
            }
            
            
            _dbTransactionService.Commit();
        }

        public List<Payment> GetPayments(int userId, bool isPayment = false)
        {
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