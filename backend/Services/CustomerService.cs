namespace ModernizedApp.Services;

using Microsoft.EntityFrameworkCore;
using ModernizedApp.Data;
using ModernizedApp.DTOs;
using ModernizedApp.Models;

public interface ICustomerService
{
    Task<IEnumerable<CustomerResponseDto>> GetAllCustomersAsync();
    Task<CustomerResponseDto?> GetCustomerByIdAsync(int id);
    Task<CustomerResponseDto?> GetCustomerByNumberAsync(string customerNumber);
    Task<CustomerResponseDto> CreateCustomerAsync(CustomerCreateDto dto);
    Task<CustomerResponseDto?> UpdateCustomerAsync(int id, CustomerUpdateDto dto);
    Task<bool> DeleteCustomerAsync(int id);
}

public class CustomerService : ICustomerService
{
    private readonly ApplicationDbContext _context;

    public CustomerService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<CustomerResponseDto>> GetAllCustomersAsync()
    {
        var customers = await _context.Customers
            .Include(c => c.Accounts)
            .ToListAsync();

        return customers.Select(MapToResponseDto);
    }

    public async Task<CustomerResponseDto?> GetCustomerByIdAsync(int id)
    {
        var customer = await _context.Customers
            .Include(c => c.Accounts)
            .FirstOrDefaultAsync(c => c.Id == id);

        return customer == null ? null : MapToResponseDto(customer);
    }

    public async Task<CustomerResponseDto?> GetCustomerByNumberAsync(string customerNumber)
    {
        var customer = await _context.Customers
            .Include(c => c.Accounts)
            .FirstOrDefaultAsync(c => c.CustomerNumber == customerNumber);

        return customer == null ? null : MapToResponseDto(customer);
    }

    public async Task<CustomerResponseDto> CreateCustomerAsync(CustomerCreateDto dto)
    {
        var customer = new Customer
        {
            Company = string.IsNullOrWhiteSpace(dto.Company) ? "BNK1" : dto.Company,
            CustomerNumber = dto.CustomerNumber,
            Title = dto.Title,
            FirstName = dto.FirstName,
            MiddleInitials = dto.MiddleInitials,
            LastName = dto.LastName,
            AddressLine1 = dto.AddressLine1,
            AddressLine2 = dto.AddressLine2,
            City = dto.City,
            PostCode = dto.PostCode,
            Country = dto.Country,
            DateOfBirth = dto.DateOfBirth,
            SortCode = dto.SortCode,
            CreditScore = dto.CreditScore,
            ScoreDate = dto.ScoreDate ?? DateTime.UtcNow,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        _context.Customers.Add(customer);
        await _context.SaveChangesAsync();

        var response = MapToResponseDto(customer);
        response.Message = "Customer successfully created (BNK1CCM)";
        return response;
    }

    public async Task<CustomerResponseDto?> UpdateCustomerAsync(int id, CustomerUpdateDto dto)
    {
        var customer = await _context.Customers
            .Include(c => c.Accounts)
            .FirstOrDefaultAsync(c => c.Id == id);

        if (customer == null)
            return null;

        customer.Company = dto.Company;
        customer.Title = dto.Title;
        customer.FirstName = dto.FirstName;
        customer.MiddleInitials = dto.MiddleInitials;
        customer.LastName = dto.LastName;
        customer.AddressLine1 = dto.AddressLine1;
        customer.AddressLine2 = dto.AddressLine2;
        customer.City = dto.City;
        customer.PostCode = dto.PostCode;
        customer.Country = dto.Country;
        customer.DateOfBirth = dto.DateOfBirth;
        customer.SortCode = dto.SortCode;
        customer.CreditScore = dto.CreditScore;
        customer.ScoreDate = dto.ScoreDate;
        customer.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();

        var response = MapToResponseDto(customer);
        response.Message = "Customer successfully updated (BNK1DCM/UAM)";
        return response;
    }

    public async Task<bool> DeleteCustomerAsync(int id)
    {
        var customer = await _context.Customers.FindAsync(id);
        if (customer == null)
            return false;

        _context.Customers.Remove(customer);
        await _context.SaveChangesAsync();
        return true;
    }

    private static CustomerResponseDto MapToResponseDto(Customer customer)
    {
        return new CustomerResponseDto
        {
            Id = customer.Id,
            Company = customer.Company,
            CustomerNumber = customer.CustomerNumber,
            Title = customer.Title,
            FirstName = customer.FirstName,
            MiddleInitials = customer.MiddleInitials,
            LastName = customer.LastName,
            AddressLine1 = customer.AddressLine1,
            AddressLine2 = customer.AddressLine2,
            City = customer.City,
            PostCode = customer.PostCode,
            Country = customer.Country,
            DateOfBirth = customer.DateOfBirth,
            SortCode = customer.SortCode,
            CreditScore = customer.CreditScore,
            ScoreDate = customer.ScoreDate,
            Message = "SUCCESS",
            Accounts = customer.Accounts.Select(a => new AccountResponseDto
            {
                Id = a.Id,
                Company = a.Company,
                AccountNumber = a.AccountNumber,
                CustomerId = a.CustomerId,
                CustomerNumber = customer.CustomerNumber,
                SortCode = a.SortCode,
                AccountType = a.AccountType,
                InterestRate = a.InterestRate,
                OverdraftLimit = a.OverdraftLimit,
                OpenDate = a.OpenDate,
                LastStatementDate = a.LastStatementDate,
                NextStatementDate = a.NextStatementDate,
                AvailableBalance = a.AvailableBalance,
                ActualBalance = a.ActualBalance,
                Message = "OK"
            }).ToList()
        };
    }
}