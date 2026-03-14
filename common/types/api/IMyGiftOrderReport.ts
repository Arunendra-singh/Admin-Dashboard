export interface IMyGiftOrderReportResponse {
    status: number;
    message: string;
    data: IMyGiftOrderReport[];
}

export interface IMyGiftOrderReport {
    webSiteguid: string;
    rulename: string;
    description: string;
    userguids: string[];
    discountpercentage: any;
    discountamount: number;
    minimumorderamount: number;
    maxLimitperuser: number;
    promocodes: string;
    ispublic: boolean;
    isgiftvoucher: boolean;
    fromdate: string;
    todate: string;
}
