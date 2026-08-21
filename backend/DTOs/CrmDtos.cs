namespace ModernizedApp.DTOs
{
    public record CreateCustomerDto(
        string Company,
        string CustNo,
        string Title,
        string FirstName,
        string Initials,
        string LastName,
        string Address1,
        string Address2,
        string City,
        string Postcode,
        string Country,
        DateTime DateOfBirth,
        string SortCode,
        int CreditScore
    );

    public record UpdateCustomerDto(
        string Title,
        string FirstName,
        string Initials,
        string LastName,
        string Address1,
        string Address2,
        string City,
        string Postcode,
        string Country,
        DateTime DateOfBirth,
        int CreditScore
    );

    public record CreateAccountDto(
        string Company,
        string CustNo,
        string AccNo,
        string AccType,
        decimal InterestRate,
        decimal OverdraftLimit,
        string SortCode,
        decimal InitialDeposit
    );

    public record UpdateAccountDto(
        string AccType,
        decimal InterestRate,
        decimal OverdraftLimit,
        string SortCode
    );

    public record DepositWithdrawDto(
        string Company,
        string AccNo,
        string Sign, // '+' for deposit, '-' for withdraw
        decimal Amount,
        string SortCode
    );

    public record TransferDto(
        string Company,
        string FromAccNo,
        string ToAccNo,
        decimal Amount,
        string FromSortCode,
        string ToSortCode
    );

    public record BatchPostingDto(
        string Company,
        string FromAccNo,
        string ToAccNo,
        decimal Amount,
        string ActSign,
        decimal ActPnd,
        decimal ActPnc,
        string AvaSign,
        decimal AvaPnd,
        decimal AvaPnc
    );
}