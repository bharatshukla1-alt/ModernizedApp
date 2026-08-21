using Microsoft.EntityFrameworkCore;
using ModernizedApp.Models;

namespace ModernizedApp.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Customer> Customers { get; set; } = null!;
        public DbSet<Account> Accounts { get; set; } = null!;
        public DbSet<Transaction> Transactions { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Customer>()
                .HasIndex(c => c.CustNo)
                .IsUnique();

            modelBuilder.Entity<Account>()
                .HasIndex(a => a.AccNo)
                .IsUnique();

            modelBuilder.Entity<Customer>().HasData(
                new Customer
                {
                    Id = 1,
                    Company = "BNK1",
                    CustNo = "CST10001",
                    Title = "Mr",
                    FirstName = "John",
                    Initials = "A",
                    LastName = "Smith",
                    Address1 = "100 High Street",
                    Address2 = "Suite 4",
                    City = "London",
                    Postcode = "EC1A 1BB",
                    Country = "United Kingdom",
                    DateOfBirth = new DateTime(1985, 5, 12),
                    SortCode = "20-00-00",
                    CreditScore = 750,
                    ScoreDate = new DateTime(2023, 1, 15)
                },
                new Customer
                {
                    Id = 2,
                    Company = "BNK1",
                    CustNo = "CST10002",
                    Title = "Ms",
                    FirstName = "Sarah",
                    Initials = "M",
                    LastName = "Connor",
                    Address1 = "45 Victoria Road",
                    Address2 = "",
                    City = "Manchester",
                    Postcode = "M1 2WD",
                    Country = "United Kingdom",
                    DateOfBirth = new DateTime(1990, 8, 22),
                    SortCode = "20-00-00",
                    CreditScore = 810,
                    ScoreDate = new DateTime(2023, 3, 10)
                }
            );

            modelBuilder.Entity<Account>().HasData(
                new Account
                {
                    Id = 1,
                    Company = "BNK1",
                    CustNo = "CST10001",
                    AccNo = "ACC80001",
                    AccType = "SAVINGS",
                    InterestRate = 2.5m,
                    OverdraftLimit = 500.00m,
                    SortCode = "20-00-00",
                    OpenDate = new DateTime(2020, 1, 10),
                    LastStatementDate = new DateTime(2023, 11, 1),
                    NextStatementDate = new DateTime(2023, 12, 1),
                    AvailableBalance = 4500.00m,
                    ActualBalance = 5000.00m
                },
                new Account
                {
                    Id = 2,
                    Company = "BNK1",
                    CustNo = "CST10002",
                    AccNo = "ACC80002",
                    AccType = "CHECKING",
                    InterestRate = 0.5m,
                    OverdraftLimit = 1000.00m,
                    SortCode = "20-00-00",
                    OpenDate = new DateTime(2021, 3, 15),
                    LastStatementDate = new DateTime(2023, 11, 1),
                    NextStatementDate = new DateTime(2023, 12, 1),
                    AvailableBalance = 12000.50m,
                    ActualBalance = 12000.50m
                }
            );
        }
    }
}