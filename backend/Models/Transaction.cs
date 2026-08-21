using System.ComponentModel.DataAnnotations;

namespace ModernizedApp.Models
{
    public class Transaction
    {
        [Key]
        public int Id { get; set; }
        public string Company { get; set; } = "BNK1";
        public string TransactionType { get; set; } = string.Empty;
        public string FromAccNo { get; set; } = string.Empty;
        public string ToAccNo { get; set; } = string.Empty;
        public decimal Amount { get; set; }
        public string Sign { get; set; } = "+";
        public string FromSortCode { get; set; } = string.Empty;
        public string ToSortCode { get; set; } = string.Empty;
        public decimal FromActualBalance { get; set; }
        public decimal ToActualBalance { get; set; }
        public decimal FromAvailableBalance { get; set; }
        public decimal ToAvailableBalance { get; set; }
        public DateTime Timestamp { get; set; } = DateTime.UtcNow;
        public string Message { get; set; } = string.Empty;
    }
}