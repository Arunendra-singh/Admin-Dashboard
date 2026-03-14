export interface IGetAllReviewsListResponse {
    statuscode: string;
    message: string;
    reviewcount: number;
    productdetail: any[];
    listreview: Listreview[];
}

export interface Listreview {
    reviewratingguid: string;
    rating: string;
    reviewtitle: string;
    reviewdescription: string;
    productguid: string;
    productcode: string;
    productname: string;
    status: string;
    websiteguid: string;
    createddate: string;
    reviewslist: any;
    positivecount: number;
    negativecount: number;
    imageurl: string;
    isactive: boolean;
    ipaddress: any;
    createdby: string;
    createddateutc: string;
    modifiedby: any;
    modifieddateutc: string;
}
