export interface IMyCartResponse {
    data: IBasketData;
    massage: string;
    statuscode: number;
}

export interface IBasketData {
    basketdetailst: IProductDetails[];
    frequency: IFrequency[];
    frequencytype: string;
    resources: IResources;
}

interface IProductDetails {
    addons: any[];
    basketdetailsguid: string;
    currencycode: null;
    customfield: string[];
    customfield1: string[];
    dealsdiscountamount: number;
    frequency: number;
    imagealttext: string;
    imageurl: string;
    inventory: number;
    isaddedinwishlist: boolean;
    isdiscountedproduct: boolean;
    minquantity: number;
    notetext: string;
    price: number;
    productcode: string;
    productguid: string;
    productname: string;
    quantity: number;
    skuguid: string;
    skuname: string;
    subscriptiondiscountamount: number;
    unit: null;
    variantimagename: string;
    variantName: null;
    variantsize: string;
}

export interface IFrequency {
    frequency: string;
}

export interface IResources {
    AddtoCart: string;
    "Basket.AddToBasket": string;
    "Basket.ExtraChargesMessage": string;
    "Basket.Label.FreeProduct": string;
    "Basket.Labels.Product": string;
    "Basket.Labels.ProductName": string;
    "Basket.Labels.TotalAmount": string;
    "Basket.Labels.ViewBasket": string;
    "Basket.msg.QuantityValidation": string;
    "Basket.Proceedtocheckout": string;
    "Products.AsLowAs": string;
}
