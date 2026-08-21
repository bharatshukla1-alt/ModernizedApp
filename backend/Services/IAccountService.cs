using ModernCrm.Api.DTOs;

namespace ModernCrm.Api.Services
{
    public interface IAccountService
    {
        Task<IEnumerable<AccountDto>> GetAccountsByCustomerNumberAsync(string customerNumber);
        Task<AccountDto?> GetAccountByNumberAsync(string accountNumber);
        Task<AccountDto> CreateAccountAsync(CreateAccountDto dto);
        Task<AccountDto?> UpdateAccountAsync(string accountNumber, UpdateAccountDto dto);
        Task<bool> DeleteAccountAsync(string accountNumber);
    }
}