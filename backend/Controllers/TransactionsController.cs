using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ModernizedApp.Data;
using ModernizedApp.DTOs;
using ModernizedApp.Models;

namespace ModernizedApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TransactionsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TransactionsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Transaction>>> GetTransactions([FromQuery] string? accNo)
        {
            var query = _context.Transactions.AsQueryable();
            if (!string.IsNullOrWhiteSpace(accNo))
            {
                query = query.Where(t => t.FromAccNo == accNo || t.ToAccNo == accNo);
            }
            return await query.OrderByDescending(t => t.Timestamp).ToListAsync();
        }

        [HttpPost("deposit-withdraw")]
        public async Task<ActionResult<Transaction>> DepositOrWithdraw([FromBody] DepositWithdrawDto dto)
        {
            var account = await _context.Accounts.FirstOrDefaultAsync(a => a.AccNo == dto.AccNo);
            if (account == null)
            {
                return NotFound(new { message = "Account not found." });
            }

            if (dto.Sign == "-")
            {
                if (account.AvailableBalance + account.OverdraftLimit < dto.Amount)
                {
                    return BadRequest(new { message = "Insufficient funds available." });
                }
                account.ActualBalance -= dto.Amount;
                account.AvailableBalance -= dto.Amount;
            }
            else
            {
                account.ActualBalance += dto.Amount;
                account.AvailableBalance += dto.Amount;
            }

            var tx = new Transaction
            {
                Company = dto.Company,
                TransactionType = dto.Sign == "-" ? "WITHDRAWAL" : "DEPOSIT",
                FromAccNo = dto.AccNo,
                ToAccNo = dto.AccNo,
                Amount = dto.Amount,
                Sign = dto.Sign,
                FromSortCode = dto.SortCode,
                ToModernizedBalance(account),
                Timestamp = DateTime.UtcNow,
                Message = $"Successful {dto.Sign} transaction on account {dto.AccNo}"
            };

            _context.Transactions.Add(tx);
            await _context.SaveChangesAsync();

            return Ok(tx);
        }

        private static decimal FromModernizedBalance(Account acc) => acc.ActualBalance;
        private static decimal ToModernizedBalance(Account acc) => acc.AvailableBalance;

        [HttpPost("transfer")]
        public async Task<ActionResult<Transaction>> Transfer([FromBody] TransferDto dto)
        {
            var fromAccount = await _context.Accounts.FirstOrDefaultAsync(a => a.AccNo == dto.FromAccNo);
            var toAccount = await _context.Accounts.FirstOrDefaultAsync(a => a.AccNo == dto.ToAccNo);

            if (fromAccount == null || toAccount == null)
            {
                return NotFound(new { message = "One or both account numbers are invalid." });
            }

            if (fromAccount.AvailableBalance + fromAccount.OverdraftLimit < dto.Amount)
            {
                return BadRequest(new { message = "Source account has insufficient funds." });
            }

            fromAccount.ActualBalance -= dto.Amount;
            fromAccount.AvailableBalance -= dto.Amount;

            toAccount.ActualBalance += dto.Amount;
            toAccount.AvailableBalance += dto.Amount;

            var tx = new Transaction
            {
                Company = dto.Company,
                TransactionType = "TRANSFER",
                FromAccNo = dto.FromAccNo,
                ToAccNo = dto.ToAccNo,
                Amount = dto.Amount,
                Sign = "-",
                FromSortCode = dto.FromSortCode,
                ToModernizedBalance = dto.ToSortCode,
                FromActualBalance = fromAccount.ActualBalance,
                ToActualBalance = toAccount.ActualBalance,
                FromAvailableBalance = fromAccount.AvailableBalance,
                ToAvailableBalance = toAccount.AvailableBalance,
                Timestamp = DateTime.UtcNow,
                Message = $"Transferred {dto.Amount:C} from {dto.FromAccNo} to {dto.ToAccNo}"
            };

            _context.Transactions.Add(tx);
            await _context.SaveChangesAsync();

            return Ok(tx);
        }

        [HttpPost("batch")]
        public async Task<ActionResult<Transaction>> BatchPosting([FromBody] BatchPostingDto dto)
        {
            var fromAccount = await _context.Accounts.FirstOrDefaultAsync(a => a.AccNo == dto.FromAccNo);
            var toAccount = await _context.Accounts.FirstOrDefaultAsync(a => a.AccNo == dto.ToAccNo);

            if (fromAccount == null || toAccount == null)
            {
                return NotFound(new { message = "Batch account targets missing." });
            }

            if (dto.ActSign == "-")
            {
                fromAccount.ActualBalance -= dto.Amount;
                toAccount.ActualBalance += dto.Amount;
            }
            else
            {
                fromAccount.ActualBalance += dto.Amount;
                toAccount.ActualBalance -= dto.Amount;
            }

            if (dto.AvaSign == "-")
            {
                fromAccount.AvailableBalance -= dto.Amount;
                toAccount.AvailableBalance += dto.Amount;
            }
            else
            {
                fromAccount.AvailableBalance += dto.Amount;
                toAccount.AvailableBalance -= dto.Amount;
            }

            var tx = new Transaction
            {
                Company = dto.Company,
                TransactionType = "BATCH_POSTING",
                FromAccNo = dto.FromAccNo,
                ToAccNo = dto.ToAccNo,
                Amount = dto.Amount,
                Sign = dto.ActSign,
                FromActualBalance = fromAccount.ActualBalance,
                ToActualBalance = toAccount.ActualBalance,
                FromAvailableBalance = fromAccount.AvailableBalance,
                ToAvailableBalance = toAccount.AvailableBalance,
                Timestamp = DateTime.UtcNow,
                Message = "Batch posting transaction complete."
            };

            _context.Transactions.Add(tx);
            await _context.SaveChangesAsync();

            return Ok(tx);
        }
    }
}