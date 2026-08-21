namespace ModernizedApp.DTOs;

public class DepositRequestDto
{
    public string Company { get; set; } = "BNK1";
    public string AccountNumber { get; set; } = string.Empty;
    public string SortCode { get; set; } = string.Empty;
    public decimal Amount { get; set; }
    public string Sign { get; set; } = "+";
}

public class TransferRequestDto
{
    public string Company { get; set; } = "BNK1";
    public string FromAccountNumber { get; set; } = string.Empty;
    public string FromSortCode { get; set; } = string.Empty;
    public string ToAccountNumber { get; set; } = string.Empty;
    public string ToSortCode { get; set; } = string.Empty;
    public decimal Amount { get; set; }
}

public class BatchTransferRequestDto
{
    public string Company { get; set; } = "BNK1";
    public string FromSystemCode { get; set; } = string.Empty;
    public string FromAccountNumber { get; set; } = string.Empty;
    public string ToSystemCode { get; set; } = string.Empty;
    public string ToAccountNumber { get; set; } = string.Empty;
    public decimal Amount { get; set; }
    public string ActSign { get; set; } = "+";
    public bool IsPending { get; set; }
}

public class TransactionResponseDto
{
    public int Id { get; set; }
    public string Company { get; set; } = string.Empty;
    public string FromAccountNumber { get; set; } = string.Empty;
    public string ToAccountNumber { get; set; } = string.Empty;
    public string FromSortCode { get; set; } = string.Empty;
    public string ToSortCode { get; set; } = string.Empty;
    public decimal Amount { get; set; }
    public string Sign { get; set; } = "+";
    public string TransactionType { get; set; } = string.Empty;
    public bool IsPending { get; set; }
    public string Message { get; set; } = string.Empty;
    public decimal UpdatedFromActualBalance { get; set; }
    public decimal UpdatedFromAvailableBalance { get; set; }
    public decimal UpdatedToActualBalance { get; set; }
    public decimal UpdatedToAvailableBalance { get; set; }
    public DateTime TransactionDate { get; set; }
}