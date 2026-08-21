namespace ModernizedApp.DTOs;

public class AccountCreateDto
{
    public string Company { get; set; } = "BNK1";
    public string AccountNumber { get; set; } = string.Empty;
    public int CustomerId { get; set; }
    public string CustomerNumber { get; set; } = string.Empty;
    public string SortCode { get; set; } = string.Empty;
    public string AccountType { get; set; } = string.Empty;
    public decimal InterestRate { get; set; }
    public decimal OverdraftLimit { get; set; }
    public DateTime OpenDate { get; set; } = DateTime.UtcNow;
    public DateTime? LastStatementDate { get; set; }
    public DateTime? NextStatementDate { get; set; }
    public decimal AvailableBalance { get; set; }
    public decimal ActualBalance { get; set; }
}

public class AccountUpdateDto
{
    public string Company { get; set; } = "BNK1";
    public string AccountType { get; set; } = string.Empty;
    public decimal InterestRate { get; set; }
    public decimal OverdraftLimit { get; set; }
    public DateTime? LastStatementDate { get; set; }
    public DateTime? NextStatementDate { get; set; }
    public decimal AvailableBalance { get; set; }
    public decimal ActualBalance { get; set; }
}

public class AccountResponseDto
{
    public int Id { get; set; }
    public string Company { get; set; } = string.Empty;
    public string AccountNumber { get; set; } = string.Empty;
    public int CustomerId { get; set; }
    public string CustomerNumber { get; set; } = string.Empty;
    public string SortCode { get; set; } = string.Empty;
    public string AccountType { get; set; } = string.Empty;
    public decimal InterestRate { get; set; }
    public decimal OverdraftLimit { get; set; }
    public DateTime OpenDate { get; set; }
    public DateTime? LastStatementDate { get; set; }
    public DateTime? NextStatementDate { get; set; }
    public decimal AvailableBalance { get; set; }
    public decimal ActualBalance { get; set; }
    public string Message { get; set; } = string.Empty;
}