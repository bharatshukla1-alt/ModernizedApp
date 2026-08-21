using Microsoft.EntityFrameworkCore;
using ModernCrm.Api.Models;

namespace ModernCrm.Api.Data
{
    public class CrmDbContext : DbContext
    {
        public CrmDbContext(DbContextOptions<CrmDbContext> options) : base(options) { }

        public DbSet<Customer> Customers => Set<Customer>();
        public DbSet<Account> Accounts => Set<Account>();
        public DbSet<Transaction> Transactions => Set<Transaction>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Customer>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasIndex(e => e.CustomerNumber).IsUnique();
                entity.Property(e => e.Company).HasMaxLength(10);
                entity.Property(e => e.CustomerNumber).HasMaxLength(20).IsRequired();
                entity.Property(e => e.Title).HasMaxLength(10);
                entity.Property(e => e.FirstName).HasMaxLength(50);
                entity.Property(e => e.LastName).HasMaxLength(50);
            });

            modelBuilder.Entity<Account>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasIndex(e => e.AccountNumber).IsUnique();
                entity.Property(e => e.AccountNumber).HasMaxLength(20).IsRequired();
                entity.Property(e => e.AccountType).HasMaxLength(10);
                entity.Property(e => e.InterestRate).HasPrecision(18, 4);
                entity.Property(e => e.OverdraftLimit).HasPrecision(18, 2);
                entity.Property(e => e.AvailableBalance).HasPrecision(18, 2);
                entity.Property(e => e.ActualBalance).HasPrecision(18, 2);

                entity.HasOne(a => a.Customer)
                      .WithMany(c => c.Accounts)
                      .HasForeignKey(a => a.CustomerId)
                      .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<Transaction>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Amount).HasPrecision(18, 2);
            });
        }
    }
}