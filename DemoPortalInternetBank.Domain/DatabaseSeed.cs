using System.Collections.Generic;
using System.Linq;
using DemoPortalInternetBank.Domain.Entities;

namespace DemoPortalInternetBank.Domain
{
    public static class DatabaseSeed
    {
        public static void Seed(EfDbContext ctx)
        {
            StartDb(ctx);
        }

        private static void StartDb(EfDbContext ctx)
        {
            var bankList = new List<Bank>
            {
                new Bank
                {
                    Name = "ПАО Сбербанк",
                    CheckingAccount = "0120012012010201"
                },
                new Bank
                {
                    Name = "ПАО ВТБ",
                    CheckingAccount = "0120012012010201"
                },
                new Bank
                {
                    Name = "ПАО Тинькофф",
                    CheckingAccount = "0120012012010201"
                },
                new Bank
                {
                    Name = "Открытие-Банк",
                    CheckingAccount = "0120012012010201"
                }
            };

            var respondentList = new List<Respondent>
            {
                new Respondent
                {
                    Name = "ОАО Нефтегаз",
                    Inn = "123",
                    Kpp = "1000",
                },
                new Respondent
                {
                    Name = "ОАО Торгово-промышленная палата",
                    Inn = "123",
                    Kpp = "1000",
                },
                new Respondent
                {
                    Name = "ОАО Буринтех",
                    Inn = "123",
                    Kpp = "1000",
                },
                new Respondent
                {
                    Name = "ОАО Мегафон",
                    Inn = "123",
                    Kpp = "1000",
                },
                new Respondent
                {
                    Name = "НИИ Иванов",
                    Inn = "123",
                    Kpp = "1000",
                },
            };

            var accounts = new List<Account>
            {
                new Account
                {
                    Bank = bankList[0],
                    Respondent = respondentList[0],
                    AccountNumber = "40817810099910004312"
                },
                new Account
                {
                    Bank = bankList[1],
                    Respondent = respondentList[1],
                    AccountNumber = "40817810099910004312"
                },
                new Account
                {
                    Bank = bankList[2],
                    Respondent = respondentList[2],
                    AccountNumber = "40817810099910004312"
                },
                new Account
                {
                    Bank = bankList[3],
                    Respondent = respondentList[3],
                    AccountNumber = "40817810099910004312"
                },
            };

            var accountsCount = ctx.Accounts.Count();

            if (accountsCount == 0)
            {
                ctx.Accounts.AddRange(accounts);
            }

            ctx.SaveChanges();
        }
    }
}