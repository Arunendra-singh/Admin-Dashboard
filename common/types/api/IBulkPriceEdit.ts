export interface IBulkPriceEdit {
    statuscode: number;
    message: string;
    data: any;
}

export type BulkPriceEditPayload = BulkPriceEditObject[];

export interface BulkPriceEditObject {
    Type: string,
    Option: string,
    CatalogGuid: string,
    DiscountPercent: number,
    PriceEditType: string,
    ExpirationDateUtc: any,
    EnableStrikePrice: boolean,
    isEditedCustomerGroup: boolean,
    CustomerGroupGuids: string
}
