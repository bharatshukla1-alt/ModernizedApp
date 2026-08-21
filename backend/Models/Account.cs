using System.ComponentModel.DataAnnotations;

namespace ModernizedApp.Models
{
    public class Account
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Company { get; set; } = "BNK1";
        [Required]
        public string CustNo { get; set; } = string.Empty;
        [Required]
        public string AccNo { get; set; } = string.Empty;
        public string AccType { get; set; } = "SAVINGS";
        public decimal InterestRate { get; set; }
        public decimal OverdraftLimit { get; set; }
        public string SortCode { get; set; } = string.Empty;
        public DateTime OpenDate { get; set; } = DateTime.UtcNow;
        public DateTime LastStatementDate { get; set; } = DateTime.UtcNow;
        public DateTime NextStatementDate { get; set; } = DateTime.UtcNow.AddMonths(1);
        public decimal AvailableBalance { get; set; }
        public decimal ActualBalance { get; set; }
    }
}