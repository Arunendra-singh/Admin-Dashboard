export interface UpdateQuantityResponse {
    statusCode: string;
    message: string;
}
export interface UpdateQuantityPorps {
    basketdetailsguid: string;
    skuguid: string;
    imageurl: string;
    productname: string;
    productcode: string;
    imagealttext: string;
    skuname: string;
    productguid: string;
    quantity: number;
    price: number;
    variantimagename: string;
    currencycode: any;
    minquantity: number;
    addons: any[];
    isdiscountedproduct: boolean;
    customfield: string[];
    dealsdiscountamount: number;
    variantsize: string;
    notetext: string;
    frequency: number;
    unit: any;
    isaddedinwishlist: boolean;
    customfield1: string[];
    subscriptiondiscountamount: number;
    variantname: string;
    collections: any;
}
