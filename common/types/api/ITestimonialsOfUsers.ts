export interface ITestimonialsOfUsersResponse {
    statuscode: number;
    message: string;
    data: ITestimonialsOfUsersResponseData;
}

export interface ITestimonialsOfUsersResponseData {
    carousel: boolean;
    lstmastercolor: any;
    categorieslist: any;
    collectionguids: any[];
    productlstdata: any;
    featuresetting: any;
    gloablsetting: any;
    resource: Resource;
    reviewes: Reviewe[];
    lstupcomingtradeshowproducts: any;
    redirectionurl: any;
    trendingcategories: any;
    suggestedtags: any;
    brands: any;
}

export interface Resource {
    addtobasket: string;
    addtowishlist: any;
    productcompare: string;
    quickview: any;
    iscallforprice: string;
    minquantity: string;
    aslowas: string;
    catalogpresentation: string;
    sectionviewall: string;
    wishlistcheckbox: string;
    loginrequiremsg: string;
    detail: string;
    removefromwishlistmsg: string;
    reviewcountlbl: string;
    yousave: string;
    addcompare: string;
    removecompare: string;
    charhyphen: any;
    viewproduct: any;
    iscallpricecanada: string;
    iscallpriceusa: string;
    strpresentationbuttonpermission: any;
    viewalltext: any;
    stremptyspace: any;
    maxqtyvalidation: string;
    minqtyvalidation: string;
    inventorywarning: string;
    titlesuccess: string;
    addsuccess: string;
    addfailed: string;
    sampeaddfailed: string;
    quantityvalidation: string;
    cartloginrequire: string;
    maxinventory: string;
    maxbasketqty: string;
    viewallsimilarproduct: any;
    elementdesc: any;
    placeneworder: any;
    heading: string;
    noproducttitle: any;
    pricetitle: any;
    citytitle: any;
    statetitle: any;
    countrytitle: any;
    changelocation: any;
    pieces: any;
    featured: any;
    totalpriceheading: any;
}

export interface Reviewe {
    rating: string;
    productguid: string;
    reviewtitle: string;
    reviewed: string;
    userguid: string;
    username: string;
}
