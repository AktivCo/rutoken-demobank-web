using System;
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
            var rnd = new Random();

            string getRandomNum(int positionsCount)
            {
                return string.Join("", new int[positionsCount].Select(x => rnd.Next(0, 9)));
            }

            var bankList = new List<Bank>
            {
                new Bank
                {
                    Name = "ПАО «Сбербанк России»",
                    CheckingAccount = "30101810400000000225",
                    BIK = "044525225"
                },
                new Bank
                {
                    Name = "ПАО «Банк ВТБ»",
                    CheckingAccount = "30232810481100000009",
                    BIK = "044525745"
                },
                new Bank
                {
                    Name = "Акционерное общество «Тинькофф Банк»",
                    CheckingAccount = "30232810100000000004",
                    BIK = "044525974"
                },
                new Bank
                {
                    Name = "ПАО Банк «ФК Открытие»",
                    CheckingAccount = "30101810300000000985",
                    BIK = "044525985"
                }
            };

            var respondentList = new List<Respondent>
            {
                new Respondent
                {
                    Name = "ОАО «Нефтегаз»",
                    Inn = "7710026924",
                    Kpp = "771001024",
                    Protected = true
                },
                new Respondent
                {
                    Name = "Торгово-промышленная палата Российской Федерации",
                    Inn = "7710026920",
                    Kpp = "771001001"
                },
                new Respondent
                {
                    Name = "ООО «НПП Буринтех»",
                    Inn = "0272010012",
                    Kpp = "027701001",
                    Protected = true
                },
                new Respondent
                {
                    Name = "ПАО «МегаФон»",
                    Inn = "7812014560",
                    Kpp = "997750001",
                },
                new Respondent
                {
                    Name = "ООО «Иванов Алекс»",
                    Inn = "7812014564",
                    Kpp = "997750001",
                    Protected = true
                },
                new Respondent
                {
                    Name = "ООО «Глория групп»",
                    Inn = "5024173097",
                    Kpp = "502401001",
                },
                new Respondent
                {
                    Name = "ОАО «Газпром»",
                    Inn = "7812314564",
                    Kpp = "997725001",
                    Protected = true
                },
                new Respondent
                {
                    Name = "ООО «Фурлан»",
                    Inn = "5024152097",
                    Kpp = "502451001",
                },
            };

            var accounts = new List<Account>
            {
                new Account
                {
                    Bank = bankList[0],
                    Respondent = respondentList[0],
                    AccountNumber = getRandomNum(20)
                },
                new Account
                {
                    Bank = bankList[1],
                    Respondent = respondentList[1],
                    AccountNumber = getRandomNum(20)
                },
                new Account
                {
                    Bank = bankList[2],
                    Respondent = respondentList[2],
                    AccountNumber = getRandomNum(20)
                },
                new Account
                {
                    Bank = bankList[3],
                    Respondent = respondentList[3],
                    AccountNumber = getRandomNum(20)
                },
                new Account
                {
                    Bank = bankList[0],
                    Respondent = respondentList[4],
                    AccountNumber = getRandomNum(20)
                },
                new Account
                {
                    Bank = bankList[1],
                    Respondent = respondentList[5],
                    AccountNumber = getRandomNum(20)
                },
                new Account
                {
                    Bank = bankList[2],
                    Respondent = respondentList[6],
                    AccountNumber = getRandomNum(20)
                },
                new Account
                {
                    Bank = bankList[3],
                    Respondent = respondentList[7],
                    AccountNumber = getRandomNum(20)
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