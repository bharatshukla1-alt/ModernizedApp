using ModernCrm.Api.DTOs;

namespace ModernCrm.Api.Services
{
    public interface ICustomerService
    {
        Task<IEnumerable<CustomerDto>> GetAllCustomersAsync();
        Task<CustomerDto?> GetCustomerByNumberAsync(string customerNumber);
        Task<CustomerDto?> GetCustomerByIdAsync(int id);
        Task<CustomerDto> CreateCustomerAsync(CreateCustomerDto dto);
        Task<CustomerDto?> UpdateCustomerAsync(string customerNumber, UpdateCustomerDto dto);
        Task<bool> DeleteCustomerAsync(string customerNumber);
    }
}