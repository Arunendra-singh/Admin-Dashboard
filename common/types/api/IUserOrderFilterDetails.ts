export interface IUserOrderFilterDetailsPorps {
    Filters: Filter[];
}

export interface Filter {
    FilterFromDateName: string;
    FilterFromDateValue: string;
    FilterToDateName: string;
    FilterToDateValue: string;
    FilterProductName: string;
    FilterProductValue: string;
    pageNo: number;
    SortName: string;
    UserGuid: string;
    pagesize: string;
}

export interface IUserOrderFilterDetailsResponse {
    statusCode: string;
    message: string;
    data: Data;
}

export interface Data {
    orderDetails: any[];
    resources: Resources;
    orderCount: number;
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
