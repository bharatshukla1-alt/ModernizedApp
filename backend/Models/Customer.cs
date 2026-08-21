using System.ComponentModel.DataAnnotations;

namespace ModernizedApp.Models
{
    public class Customer
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Company { get; set; } = "BNK1";
        [Required]
        public string CustNo { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string FirstName { get; set; } = string.Empty;
        public string Initials { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Address1 { get; set; } = string.Empty;
        public string Address2 { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;
        public string Postcode { get; set; } = string.Empty;
        public string Country { get; set; } = string.Empty;
        public DateTime DateOfBirth { get; set; }
        public string SortCode { get; set; } = string.Empty;
        public int CreditScore { get; set; }
        public DateTime ScoreDate { get; set; }
    }
}