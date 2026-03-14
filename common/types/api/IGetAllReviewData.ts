// IGetAllReviewData
export interface IGetAllReviewDataResponse {
    statuscode: number;
    message: string;
    data: Data;
}

export interface Data {
    ispagination: boolean;
    pagesize: string;
    reviewscount: number;
    productguid: string;
    productname: string;
    productcode: string;
    resources: Resources;
    reviews: Review[];
    fullName: any;
}

export interface Resources {
    heading: any;
    reviewheading: string;
}

export interface Review {
    reviewratingguid: string;
    rating: string;
    reviewtitle: string;
    reviewdescription: string;
    productguid: string;
    productcode: string;
    productname: string;
    actions: any;
    status: string;
    approvedby: any;
    approveddate: string;
    websiteguid: string;
    createddate: string;
    source: string;
    filters: any;
    reviewslist: any;
    statuscode: boolean;
    reviewlocation: string;
    isimprintareasizeadequate: string;
    isqualityimprintmeetexpectation: string;
    isproductdurableconstruction: string;
    arehappywithservices: string;
    isreceivedgoodvalue: string;
    isproductinadequatemainframe: string;
    jobfunction: string;
    recommendtofriend: string;
    publicdisplayname: string;
    jobfunctionname: any;
    userguids: any;
    positivecount: number;
    captcharesponce: any;
    negativecount: number;
    filename: any;
    filesource: any;
    languageguid: string;
    score: any;
    campaignguid: any;
    isconsiderforrecomm: boolean;
    totalcount: number;
    negative: number;
    neutral: number;
    positive: number;
    ismanualupdate: boolean;
    approveddateunix: number;
    createddateunix: number;
}
