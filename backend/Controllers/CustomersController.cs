using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ModernizedApp.Data;
using ModernizedApp.DTOs;
using ModernizedApp.Models;

namespace ModernizedApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CustomersController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CustomersController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Customer>>> GetCustomers([FromQuery] string? search)
        {
            var query = _context.Customers.AsQueryable();
            if (!string.IsNullOrWhiteSpace(search))
            {
                query = query.Where(c => c.CustNo.Contains(search) || 
                                         c.FirstName.Contains(search) || 
                                         c.LastName.Contains(search));
            }
            return await query.ToListAsync();
        }

        [HttpGet("{custNo}")]
        public async Task<ActionResult<Customer>> GetCustomer(string custNo)
        {
            var customer = await _context.Customers.FirstOrDefaultAsync(c => c.CustNo == custNo);
            if (customer == null)
            {
                return NotFound(new { message = "Customer record not found." });
            }
            return customer;
        }

        [HttpPost]
        public async Task<ActionResult<Customer>> CreateCustomer([FromBody] CreateCustomerDto dto)
        {
            if (await _context.Customers.AnyAsync(c => c.CustNo == dto.CustNo))
            {
                return BadRequest(new { message = "Customer number already exists." });
            }

            var customer = new Customer
            {
                Company = dto.Company,
                CustNo = dto.CustNo,
                Title = dto.Title,
                FirstName = dto.FirstName,
                Initials = dto.Initials,
                LastName = dto.LastName,
                Address1 = dto.Address1,
                Address2 = dto.Address2,
                City = dto.City,
                Postcode = dto.Postcode,
                Country = dto.Country,
                DateOfBirth = dto.DateOfBirth,
                SortCode = dto.SortCode,
                CreditScore = dto.CreditScore,
                ScoreDate = DateTime.UtcNow
            };

            _context.Customers.Add(customer);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCustomer), new { custNo = customer.CustNo }, customer);
        }

        [HttpPut("{custNo}")]
        public async Task<IActionResult> UpdateCustomer(string custNo, [FromBody] UpdateCustomerDto dto)
        {
            var customer = await _context.Customers.FirstOrDefaultAsync(c => c.CustNo == custNo);
            if (customer == null)
            {
                return NotFound(new { message = "Customer not found." });
            }

            customer.Title = dto.Title;
            customer.FirstName = dto.FirstName;
            customer.Initials = dto.Initials;
            customer.LastName = dto.LastName;
            customer.Address1 = dto.Address1;
            customer.Address2 = dto.Address2;
            customer.City = dto.City;
            customer.Postcode = dto.Postcode;
            customer.Country = dto.Country;
            customer.DateOfBirth = dto.DateOfBirth;
            customer.CreditScore = dto.CreditScore;
            customer.ScoreDate = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return Ok(customer);
        }

        [HttpDelete("{custNo}")]
        public async Task<IActionResult> DeleteCustomer(string custNo)
        {
            var customer = await _context.Customers.FirstOrDefaultAsync(c => c.CustNo == custNo);
            if (customer == null)
            {
                return NotFound(new { message = "Customer not found." });
            }

            var accounts = await _context.Accounts.Where(a => a.CustNo == custNo).ToListAsync();
            if (accounts.Any())
            {
                return BadRequest(new { message = "Cannot delete customer with open accounts." });
            }

            _context.Customers.Remove(customer);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Customer record successfully deleted." });
        }
    }
}