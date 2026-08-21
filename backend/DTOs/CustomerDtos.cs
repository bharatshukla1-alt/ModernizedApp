namespace ModernizedApp.DTOs;

public class CustomerCreateDto
{
    public string Company { get; set; } = "BNK1";
    public string CustomerNumber { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string FirstName { get; set; } = string.Empty;
    public string MiddleInitials { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string AddressLine1 { get; set; } = string.Empty;
    public string AddressLine2 { get; set; } = string.Empty;
    public string City { get; set; } = string.Empty;
    public string PostCode { get; set; } = string.Empty;
    public string Country { get; set; } = string.Empty;
    public DateTime? DateOfBirth { get; set; }
    public string SortCode { get; set; } = string.Empty;
    public int CreditScore { get; set; }
    public DateTime? ScoreDate { get; set; }
}

public class CustomerUpdateDto : CustomerCreateDto
{
}

public class CustomerResponseDto
{
    public int Id { get; set; }
    public string Company { get; set; } = string.Empty;
    public string CustomerNumber { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string FirstName { get; set; } = string.Empty;
    public string MiddleInitials { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string AddressLine1 { get; set; } = string.Empty;
    public string AddressLine2 { get; set; } = string.Empty;
    public string City { get; set; } = string.Empty;
    public string PostCode { get; set; } = string.Empty;
    public string Country { get; set; } = string.Empty;
    public DateTime? DateOfBirth { get; set; }
    public string SortCode { get; set; } = string.Empty;
    public int CreditScore { get; set; }
    public DateTime? ScoreDate { get; set; }
    public string Message { get; set; } = string.Empty;
    public List<AccountResponseDto> Accounts { get; set; } = new();
}