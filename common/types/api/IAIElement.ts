export interface AiElement {
    productdetails: Productdetail[];
    resources: Resources;
}

export interface Productdetail {
    productguid: string;
    productcode: string;
    productname: string;
    furtherdescription: string;
    productimageurl: string;
    isaddedinwishlist: boolean;
    popularproductcount: string;
    mediaurl: any;
    productrating: number;
    productlikes: number;
    downloadscount: number;
    lastupdatedon: string;
    tagattributes: any;
    description: string;
    productaliasname: string;
    detailurl: string;
    islike: boolean;
    isdownloaded: boolean;
    isreiewed: boolean;
    price: number;
    pricingguid: string;
    featurediconsvm: any;
    productnewskuvm: Productnewskuvm[];
    productmedialist: Productmedialist[];
    minquantity: number;
    maxquantity: any;
    data_actionurl: string;
}

export interface Productnewskuvm {
    skuguid: string;
    sku: any;
    variantname: string;
    imagename: string;
    imagealttext: string;
    isdefault: boolean;
    inventory?: number;
}

export interface Productmedialist {
    medianame: any;
    mediatype: string;
    mediaalttext: string;
    media: string;
    productcode: string;
    mediaurl: string;
    skuguid: string[];
    mediagroupdisplayimage: boolean;
}

export interface Resources {
    "product.popularproducts": string;
}

export interface IAiElementResponse {
    StatusCode: number;
    Message: string;
    Details: any[];
    data: AiElement[];
    AIResponseDetails: any[];
    OrderTrendProducts: any;
    CategoryNames: any;
}
