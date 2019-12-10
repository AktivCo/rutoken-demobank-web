using DemoPortalInternetBank.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace DemoPortalInternetBank.Domain
{
    public class EfDbContext : DbContext
    {
        public EfDbContext(DbContextOptions config) : base(config)
        {
        }

        public EfDbContext()
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Bank> Banks { get; set; }
        public DbSet<Respondent> Respondents { get; set; }
        public DbSet<Account> Accounts { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().HasKey(r => r.Id);

            modelBuilder.Entity<Bank>().HasKey(r => r.Id);

            modelBuilder.Entity<Respondent>().HasKey(r => r.Id);

            modelBuilder.Entity<Account>().HasKey(r => r.Id);

            modelBuilder.Entity<Account>()
                .HasOne(prop => prop.Bank)
                .WithMany()
                .HasForeignKey(f => new {f.BankId})
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Account>()
                .HasOne(prop => prop.Respondent)
                .WithMany()
                .HasForeignKey(f => new {f.RespondentId})
                .OnDelete(DeleteBehavior.Restrict);


            modelBuilder.Entity<Payment>().HasKey(r => r.Id);

            modelBuilder.Entity<Payment>()
                .HasOne(prop => prop.Account)
                .WithMany()
                .HasForeignKey(f => new {f.AccountId})
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Payment>()
                .HasOne(prop => prop.User)
                .WithMany()
                .HasForeignKey(f => new {f.UserId})
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}