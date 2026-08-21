namespace ModernizedApp.Services;

using Microsoft.EntityFrameworkCore;
using ModernizedApp.Data;
using ModernizedApp.DTOs;
using ModernizedApp.Models;

public interface IAccountService
{
    Task<IEnumerable<AccountResponseDto>> GetAllAccountsAsync();
    Task<AccountResponseDto?> GetAccountByIdAsync(int id);
    Task<AccountResponseDto?> GetAccountByNumberAsync(string accountNumber);
    Task<AccountResponseDto> CreateAccountAsync(AccountCreateDto dto);
    Task<AccountResponseDto?> UpdateAccountAsync(int id, AccountUpdateDto dto);
    Task<bool> DeleteAccountAsync(int id);
}

public class AccountService : IAccountService
{
    private readonly ApplicationDbContext _context;

    public AccountService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<AccountResponseDto>> GetAllAccountsAsync()
    {
        var accounts = await _context.Accounts.Include(a => a.Customer).ToListAsync();
        return accounts.Select(MapToDto);
    }

    public async Task<AccountResponseDto?> GetAccountByIdAsync(int id)
    {
        var account = await _context.Accounts.Include(a => a.Customer).FirstOrDefaultAsync(a => a.Id == id);
        return account == null ? null : MapToDto(account);
    }

    public async Task<AccountResponseDto?> GetAccountByNumberAsync(string accountNumber)
    {
        var account = await _context.Accounts.Include(a => a.Customer).FirstOrDefaultAsync(a => a.AccountNumber == accountNumber);
        return account == null ? null : MapToDto(account);
    }

    public async Task<AccountResponseDto> CreateAccountAsync(AccountCreateDto dto)
    {
        var customer = await _context.Customers.FirstOrDefaultAsync(c => c.Id == dto.CustomerId || c.CustomerNumber == dto.CustomerNumber);
        if (customer == null)
        {
            throw new InvalidOperationException($"Customer not found for CustomerNumber: {dto.CustomerNumber} or CustomerId: {dto.CustomerId}");
        }

        var account = new Account
        {
            Company = string.IsNullOrWhiteSpace(dto.Company) ? "BNK1" : dto.Company,
            AccountNumber = dto.AccountNumber,
            CustomerId = customer.Id,
            SortCode = dto.SortCode,
            AccountType = dto.AccountType,
            InterestRate = dto.InterestRate,
            OverdraftLimit = dto.OverdraftLimit,
            OpenDate = dto.OpenDate,
            LastStatementDate = dto.LastStatementDate,
            NextStatementDate = dto.NextStatementDate,
            AvailableBalance = dto.AvailableBalance,
            ActualBalance = dto.ActualBalance,
            CreatedAt = DateTime.UtcNow
        };

        _context.Accounts.Add(account);
        await _context.SaveChangesAsync();

        account.Customer = customer;
        var result = MapToDto(account);
        result.Message = "Account created successfully (BNK1CAM)";
        return result;
    }

    public async Task<AccountResponseDto?> UpdateAccountAsync(int id, AccountUpdateDto dto)
    {
        var account = await _context.Accounts.Include(a => a.Customer).FirstOrDefaultAsync(a => a.Id == id);
        if (account == null)
            return null;

        account.Company = dto.Company;
        account.AccountType = dto.AccountType;
        account.InterestRate = dto.InterestRate;
        account.OverdraftLimit = dto.OverdraftLimit;
        account.LastStatementDate = dto.LastStatementDate;
        account.NextStatementDate = dto.NextStatementDate;
        account.AvailableBalance = dto.AvailableBalance;
        account.ActualBalance = dto.ActualBalance;

        await _context.SaveChangesAsync();
        var result = MapToDto(account);
        result.Message = "Account updated successfully (BNK1UAM)";
        return result;
    }

    public async Task<bool> DeleteAccountAsync(int id)
    {
        var account = await _context.Accounts.FindAsync(id);
        if (account == null)
            return false;

        _context.Accounts.Remove(account);
        await _context.SaveChangesAsync();
        return true;
    }

    private static AccountResponseDto MapToDto(Account account)
    {
        return new AccountResponseDto
        {
            Id = account.Id,
            Company = account.Company,
            AccountNumber = account.AccountNumber,
            CustomerId = account.CustomerId,
            CustomerNumber = account.Customer?.CustomerNumber ?? string.Empty,
            SortCode = account.SortCode,
            AccountType = account.AccountType,
            InterestRate = account.InterestRate,
            OverdraftLimit = account.OverdraftLimit,
            OpenDate = account.OpenDate,
            LastStatementDate = account.LastStatementDate,
            NextStatementDate = account.NextStatementDate,
            AvailableBalance = account.AvailableBalance,
            ActualBalance = account.ActualBalance,
            Message = "SUCCESS"
        };
    }
}