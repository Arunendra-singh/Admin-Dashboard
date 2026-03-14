export interface IWalletTransactionListResponse {
    statusCode: number;
    message: string;
    transactionList: TransactionList[];
    currentWalletBalance: string;
}

export interface TransactionList {
    walletTransactionGuid: string;
    userGuid: string;
    websiteGuid: string;
    action: string;
    amount: number;
    description: string;
    isApproved: boolean;
    status: string;
    transactiondatetime: string;
    transactionNo?: string;
    orderNoForWalletTransaction?: string;
    isRefund: boolean;
}
