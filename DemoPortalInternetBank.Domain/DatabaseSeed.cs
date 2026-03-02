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
                    Translation = new Translation { Ru="ПАО «Сбербанк России»", En="Sberbank of Russia" },
                    CheckingAccount = "30101810400000000225",
                    BIK = "044525225"
                },
                new Bank
                {
                    Translation = new Translation { Ru="ПАО «Банк ВТБ»", En="VTB Bank" },
                    CheckingAccount = "30232810481100000009",
                    BIK = "044525745"
                },
                new Bank
                {
                    Translation = new Translation { Ru="Акционерное общество «Тинькофф Банк»", En="Tinkoff" },
                    CheckingAccount = "30232810100000000004",
                    BIK = "044525974"
                },
                new Bank
                {
                    Translation = new Translation { Ru="ПАО Банк «ФК Открытие»", En="Otkritie Bank" },
                    CheckingAccount = "30101810300000000985",
                    BIK = "044525985"
                }
            };

            var respondentList = new List<Respondent>
            {
                new Respondent
                {
                    Translation = new Translation { Ru="ОАО «Нефтегаз»", En="Neftegaz" },
                    Inn = "7710026924",
                    Kpp = "771001024",
                    Protected = true
                },
                new Respondent
                {
                    Translation = new Translation { Ru="Торгово-промышленная палата Российской Федерации", En="Chamber of Commerce and Industry of the Russian Federation" },
                    Inn = "7710026920",
                    Kpp = "771001001"
                },
                new Respondent
                {
                    Translation = new Translation { Ru="ООО «НПП Буринтех»", En="Burinteh" },
                    Inn = "0272010012",
                    Kpp = "027701001",
                    Protected = true
                },
                new Respondent
                {
                    Translation = new Translation { Ru="ПАО «МегаФон»", En="Megafon" },
                    Inn = "7812014560",
                    Kpp = "997750001",
                },
                new Respondent
                {
                    Translation = new Translation { Ru="ООО «Иванов Алекс»", En="Ivanov Alex" },
                    Inn = "7812014564",
                    Kpp = "997750001",
                    Protected = true
                },
                new Respondent
                {
                    Translation = new Translation { Ru="ООО «Глория групп»", En="Gloria group" },
                    Inn = "5024173097",
                    Kpp = "502401001",
                },
                new Respondent
                {
                    Translation = new Translation { Ru="ОАО «Газпром»", En="Gazprom" },
                    Inn = "7812314564",
                    Kpp = "997725001",
                    Protected = true
                },
                new Respondent
                {
                    Translation = new Translation { Ru="ООО «Фурлан»", En="Furlan" },
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