namespace ModernizedApp.Services;

using Microsoft.EntityFrameworkCore;
using ModernizedApp.Data;
using ModernizedApp.DTOs;
using ModernizedApp.Models;

public interface ITransactionService
{
    Task<TransactionResponseDto> ProcessDepositAsync(DepositRequestDto dto);
    Task<TransactionResponseDto> ProcessTransferAsync(TransferRequestDto dto);
    Task<TransactionResponseDto> ProcessBatchTransferAsync(BatchTransferRequestDto dto);
    Task<IEnumerable<Transaction>> GetTransactionHistoryAsync(string accountNumber);
}

public class TransactionService : ITransactionService
{
    private readonly ApplicationDbContext _context;

    public TransactionService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<TransactionResponseDto> ProcessDepositAsync(DepositRequestDto dto)
    {
        var account = await _context.Accounts.FirstOrDefaultAsync(a => a.AccountNumber == dto.AccountNumber);
        if (account == null)
        {
            return new TransactionResponseDto
            {
                Company = dto.Company,
                ToAccountNumber = dto.AccountNumber,
                Amount = dto.Amount,
                Sign = dto.Sign,
                TransactionType = "DEPOSIT",
                Message = "ACCOUNT NOT FOUND (BNK1CDM)"
            };
        }

        if (dto.Sign == "-")
        {
            account.ActualBalance -= dto.Amount;
            account.AvailableBalance -= dto.Amount;
        }
        else
        {
            account.ActualBalance += dto.Amount;
            account.AvailableBalance += dto.Amount;
        }

        var transaction = new Transaction
        {
            Company = dto.Company,
            FromAccountNumber = "CASH_DESK",
            ToAccountNumber = dto.AccountNumber,
            FromSortCode = dto.SortCode,
            ToSortCode = dto.SortCode,
            Amount = dto.Amount,
            Sign = dto.Sign,
            TransactionType = "CASH_DEPOSIT",
            IsPending = false,
            StatusMessage = "DEPOSIT COMPLETED",
            TransactionDate = DateTime.UtcNow
        };

        _context.Transactions.Add(transaction);
        await _context.SaveChangesAsync();

        return new TransactionResponseDto
        {
            Id = transaction.Id,
            Company = dto.Company,
            FromAccountNumber = "CASH_DESK",
            ToAccountNumber = account.AccountNumber,
            FromSortCode = dto.SortCode,
            ToSortCode = account.SortCode,
            Amount = dto.Amount,
            Sign = dto.Sign,
            TransactionType = "CASH_DEPOSIT",
            IsPending = false,
            Message = "CASH DEPOSIT PROCESSED SUCCESSFUL (BNK1CDM)",
            UpdatedToActualBalance = account.ActualBalance,
            UpdatedToAvailableBalance = account.AvailableBalance,
            TransactionDate = transaction.TransactionDate
        };
    }

    public async Task<TransactionResponseDto> ProcessTransferAsync(TransferRequestDto dto)
    {
        var fromAccount = await _context.Accounts.FirstOrDefaultAsync(a => a.AccountNumber == dto.FromAccountNumber);
        var toAccount = await _context.Accounts.FirstOrDefaultAsync(a => a.AccountNumber == dto.ToAccountNumber);

        if (fromAccount == null || toAccount == null)
        {
            return new TransactionResponseDto
            {
                Company = dto.Company,
                FromAccountNumber = dto.FromAccountNumber,
                ToAccountNumber = dto.ToAccountNumber,
                Amount = dto.Amount,
                TransactionType = "TRANSFER",
                Message = "ONE OR BOTH ACCOUNTS NOT FOUND (BNK1TFM)"
            };
        }

        if (fromAccount.AvailableBalance + fromAccount.OverdraftLimit < dto.Amount)
        {
            return new TransactionResponseDto
            {
                Company = dto.Company,
                FromAccountNumber = dto.FromAccountNumber,
                ToAccountNumber = dto.ToAccountNumber,
                Amount = dto.Amount,
                TransactionType = "TRANSFER",
                Message = "INSUFFICIENT FUNDS IN SOURCE ACCOUNT (BNK1TFM)"
            };
        }

        fromAccount.ActualBalance -= dto.Amount;
        fromAccount.AvailableBalance -= dto.Amount;
        toAccount.ActualBalance += dto.Amount;
        toAccount.AvailableBalance += dto.Amount;

        var transaction = new Transaction
        {
            Company = dto.Company,
            FromAccountNumber = dto.FromAccountNumber,
            ToAccountNumber = dto.ToAccountNumber,
            FromSortCode = dto.FromSortCode,
            ToSortCode = dto.ToSortCode,
            Amount = dto.Amount,
            Sign = "-",
            TransactionType = "FUNDS_TRANSFER",
            IsPending = false,
            StatusMessage = "TRANSFER SUCCESSFUL",
            TransactionDate = DateTime.UtcNow
        };

        _context.Transactions.Add(transaction);
        await _context.SaveChangesAsync();

        return new TransactionResponseDto
        {
            Id = transaction.Id,
            Company = dto.Company,
            FromAccountNumber = fromAccount.AccountNumber,
            ToAccountNumber = toAccount.AccountNumber,
            FromSortCode = fromAccount.SortCode,
            ToSortCode = toAccount.SortCode,
            Amount = dto.Amount,
            Sign = "-",
            TransactionType = "FUNDS_TRANSFER",
            IsPending = false,
            Message = "FUNDS TRANSFERRED SUCCESSFULLY (BNK1TFM)",
            UpdatedFromActualBalance = fromAccount.ActualBalance,
            UpdatedFromAvailableBalance = fromAccount.AvailableBalance,
            UpdatedToActualBalance = toAccount.ActualBalance,
            UpdatedToAvailableBalance = toAccount.AvailableBalance,
            TransactionDate = transaction.TransactionDate
        };
    }

    public async Task<TransactionResponseDto> ProcessBatchTransferAsync(BatchTransferRequestDto dto)
    {
        var fromAccount = await _context.Accounts.FirstOrDefaultAsync(a => a.AccountNumber == dto.FromAccountNumber);
        var toAccount = await _context.Accounts.FirstOrDefaultAsync(a => a.AccountNumber == dto.ToAccountNumber);

        if (fromAccount == null || toAccount == null)
        {
            return new TransactionResponseDto
            {
                Company = dto.Company,
                FromAccountNumber = dto.FromAccountNumber,
                ToAccountNumber = dto.ToAccountNumber,
                Amount = dto.Amount,
                TransactionType = "BATCH_TRANSFER",
                Message = "ACCOUNT NOT FOUND FOR BATCH TRANSFER (BNK1B2M)"
            };
        }

        if (!dto.IsPending)
        {
            fromAccount.ActualBalance -= dto.Amount;
            fromAccount.AvailableBalance -= dto.Amount;
            toAccount.ActualBalance += dto.Amount;
            toAccount.AvailableBalance += dto.Amount;
        }

        var transaction = new Transaction
        {
            Company = dto.Company,
            FromAccountNumber = dto.FromAccountNumber,
            ToAccountNumber = dto.ToAccountNumber,
            FromSystemCode = dto.FromSystemCode,
            ToSystemCode = dto.ToSystemCode,
            Amount = dto.Amount,
            Sign = dto.ActSign,
            TransactionType = "BATCH_TRANSFER",
            IsPending = dto.IsPending,
            StatusMessage = dto.IsPending ? "PENDING BATCH APPROVAL" : "BATCH TRANSFER EXECUTED",
            TransactionDate = DateTime.UtcNow
        };

        _context.Transactions.Add(transaction);
        await _context.SaveChangesAsync();

        return new TransactionResponseDto
        {
            Id = transaction.Id,
            Company = dto.Company,
            FromAccountNumber = fromAccount.AccountNumber,
            ToAccountNumber = toAccount.AccountNumber,
            Amount = dto.Amount,
            Sign = dto.ActSign,
            TransactionType = "BATCH_TRANSFER",
            IsPending = dto.IsPending,
            Message = dto.IsPending ? "BATCH TRANSACTION PENDING (BNK1B2M)" : "BATCH TRANSACTION PROCESSED (BNK1B2M)",
            UpdatedFromActualBalance = fromAccount.ActualBalance,
            UpdatedFromAvailableBalance = fromAccount.AvailableBalance,
            UpdatedToActualBalance = toAccount.ActualBalance,
            UpdatedToAvailableBalance = toAccount.AvailableBalance,
            TransactionDate = transaction.TransactionDate
        };
    }

    public async Task<IEnumerable<Transaction>> GetTransactionHistoryAsync(string accountNumber)
    {
        return await _context.Transactions
            .Where(t => t.FromAccountNumber == accountNumber || t.ToAccountNumber == accountNumber)
            .OrderByDescending(t => t.TransactionDate)
            .ToListAsync();
    }
}