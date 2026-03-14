export interface IPresentationProducts {
    statuscode: number;
    message: string;
    data: presentationProducts;
}

export interface presentationProducts {
    isaddedinpresentation: boolean;
    productcode: string;
}
