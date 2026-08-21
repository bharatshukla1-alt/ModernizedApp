using ModernCrm.Api.DTOs;

namespace ModernCrm.Api.Services
{
    public interface ITransactionService
    {
        Task<TransactionResultDto> DepositOrWithdrawAsync(DepositWithdrawRequestDto request);
        Task<TransactionResultDto> TransferFundsAsync(TransferRequestDto request);
    }
}