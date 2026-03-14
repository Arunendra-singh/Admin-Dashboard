export interface IOrderPopupResponse {
    statusCode: number;
    data: Data;
    message: string;
}
export interface Data {
    orderDetails: OrderDetail[];
    resources: Resources;
    orderCount: number;
}

export interface OrderDetail {
    orderNumber: string;
    status: string;
    totalOrderPrice: number;
    createdDateUtc: string;
    orderGuid: string;
    posCallBack: any[];
    isSubscribed: boolean;
    isGiftVoucher: boolean;
}

export interface Resources {
    "Order.First Name": string;
    "Report.OrderNumber": string;
    "Order.CompanyName": string;
    "OrderSample.Error.InvalidEmailAddress": string;
    "OrderSample.Quantity": string;
    "OrderSample.Mail.Error": string;
    "Order.Labels.BillingInformation": string;
    "Order.Labels.CompanyName": string;
    "Order.Labels.AddressLine1": string;
    "Order.Labels.AddressLine2": string;
    "Order.Labels.Phone": string;
    "Report.FromDate": string;
    "Report.ToDate": string;
    "Report.ProductName": string;
    "Report.Search": string;
    "Report.Reset": string;
}
