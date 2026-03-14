export interface IApplicablePromocodes {
    statuscode: number;
    message: string;
    data: PromocodesList[];
}

export interface PromocodesList {
    promocode: string;
    rulename: string;
    promodescription: string;
    minimumorderamount: number;
    discountpercentage: number;
    maximumdiscount: number;
    expirydate: number;
}
