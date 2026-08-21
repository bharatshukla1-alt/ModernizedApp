using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ModernizedApp.Data;
using ModernizedApp.DTOs;
using ModernizedApp.Models;

namespace ModernizedApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AccountsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Account>>> GetAccounts([FromQuery] string? custNo)
        {
            var query = _context.Accounts.AsQueryable();
            if (!string.IsNullOrWhiteSpace(custNo))
            {
                query = query.Where(a => a.CustNo == custNo);
            }
            return await query.ToListAsync();
        }

        [HttpGet("{accNo}")]
        public async Task<ActionResult<Account>> GetAccount(string accNo)
        {
            var account = await _context.Accounts.FirstOrDefaultAsync(a => a.AccNo == accNo);
            if (account == null)
            {
                return NotFound(new { message = "Account record not found." });
            }
            return account;
        }

        [HttpPost]
        public async Task<ActionResult<Account>> CreateAccount([FromBody] CreateAccountDto dto)
        {
            var customerExists = await _context.Customers.AnyAsync(c => c.CustNo == dto.CustNo);
            if (!customerExists)
            {
                return BadRequest(new { message = "Associated customer does not exist." });
            }

            if (await _context.Accounts.AnyAsync(a => a.AccNo == dto.AccNo))
            {
                return BadRequest(new { message = "Account number already exists." });
            }

            var account = new Account
            {
                Company = dto.Company,
                CustNo = dto.CustNo,
                AccNo = dto.AccNo,
                AccType = dto.AccType,
                InterestRate = dto.InterestRate,
                OverdraftLimit = dto.OverdraftLimit,
                SortCode = dto.SortCode,
                OpenDate = DateTime.UtcNow,
                LastStatementDate = DateTime.UtcNow,
                NextStatementDate = DateTime.UtcNow.AddMonths(1),
                AvailableBalance = dto.InitialDeposit,
                ActualBalance = dto.InitialDeposit
            };

            _context.Accounts.Add(account);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetAccount), new { accNo = account.AccNo }, account);
        }

        [HttpPut("{accNo}")]
        public async Task<IActionResult> UpdateAccount(string accNo, [FromBody] UpdateAccountDto dto)
        {
            var account = await _context.Accounts.FirstOrDefaultAsync(a => a.AccNo == accNo);
            if (account == null)
            {
                return NotFound(new { message = "Account not found." });
            }

            account.AccType = dto.AccType;
            account.InterestRate = dto.InterestRate;
            account.OverdraftLimit = dto.OverdraftLimit;
            account.SortCode = dto.SortCode;

            await _context.SaveChangesAsync();
            return Ok(account);
        }

        [HttpDelete("{accNo}")]
        public async Task<IActionResult> DeleteAccount(string accNo)
        {
            var account = await _context.Accounts.FirstOrDefaultAsync(a => a.AccNo == accNo);
            if (account == null)
            {
                return NotFound(new { message = "Account not found." });
            }

            if (account.ActualBalance != 0)
            {
                return BadRequest(new { message = "Cannot close account with non-zero balance." });
            }

            _context.Accounts.Remove(account);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Account closed successfully." });
        }
    }
}