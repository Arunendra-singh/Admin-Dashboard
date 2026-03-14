export interface IGetSearchResultsUsingCodeExpressionAIResponse {
    statuscode: number;
    message: string;
    data: IGetSearchResultsUsingCodeExpressionAIData[];
}

export interface IGetSearchResultsUsingCodeExpressionAIData {
    rownumber: number;
    categoryname: string;
    parentcategoryname: any;
    productid: number;
    productguid: string;
    productsku: any;
    productname: string;
    productcode: string;
    categoryguid: any;
    parentcategoryguid: any;
    groupcommodityguid: any;
    visibility: boolean;
    score: number;
    encodedproductname: string;
    productnamewithcode: string;
    productaliasname: any;
    defaultimagename: any;
    imageurl: string;
    price: number;
    correctedwords: string;
    suggestion: string;
    detailurl: string;
    resource: Resource;
}

export interface Resource {
    addtobasket: string;
    addtowishlist: string;
    productcompare: string;
    quickview: string;
    addcompare: string;
}
