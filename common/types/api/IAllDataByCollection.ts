export interface IAllDataByCollectionResponse {
    statuscode: number
    message: string
    data: Data
}

export interface Data {
    carousel: boolean
    lstmastercolor: any[]
    categorieslist: any
    collectionguids: Collectionguid[]
    productlstdata: Productlstdaum[]
    frequentlyboughttogethervm: any
    featuresetting: Featuresetting
    gloablsetting: Gloablsetting
    resource: Resource
    reviewes: any
    lstupcomingtradeshowproducts: any
    redirectionurl: any
    trendingcategories: any
    suggestedtags: any
    brands: any
}

export interface Collectionguid {
    collectionguid: string
    collectionname: string
    collectionimagename: string
    alias: string
    collectiontype: string
    seodetails: Seodetails
}

export interface Seodetails {
    pagetitle: string
    metakeyword: string
    metadescription: string
    canonical: string
    metarobots: string
}

export interface Productlstdaum {
    productguid: string
    productcode: string
    productname: string
    productaliasname: string
    description: string
    productimageurl: string
    price: number
    isaddedinwishlist: boolean
    productrating: number
    detailurl: string
    isreiewed: boolean
    collectionname: string
    collectionalias: any
    customfield: any
    minprice: number
    mindiscountedprice: number
    mindiscountedstrikeprice: number
    iscallforprice: boolean
    callforprice: any
    minstrikeprice: number
    minquantity: number
    discountcode: string
    maxpriceproductcard: number
    minpriceproductcard: number
    discountcodemaxprice: any
    discountcodeminprice: any
    pricingguid: string
    featurediconsvm: any
    swatches: string[]
    brandiconsvm: any
    productnewskuvm: Productnewskuvm[]
    productmediavm: any[]
    strikeprice: number
    furtherdescription: string
    notetext: string
    skucount: number
    isincludesubscription: boolean
    yousave: number
    seodetails: Seodetail[]
}

export interface Productnewskuvm {
    inventory?: number
    skuguid: string
    sku: string
    variantname: string
    imagename: string
    imagealttext: string
    prodprices: any
    customfield: any
    price: number
    strikeprice: number
    pricingguid: any
    isdefault: boolean
}

export interface Seodetail {
    pagetitle: string
    metakeyword: string
    metadescription: string
    canonical: string
    metarobots: string
}

export interface Featuresetting {
    ispricebreakloginbased: boolean
    isshowminmaxprice: boolean
    isdecimalprecesionbasedonlogin: boolean
    guestusercheckoutisenabled: boolean
    minqtyisenabled: boolean
    isdisablepricewithoutlogin: boolean
    productinventory: boolean
    isnetsuiteenabled: boolean
    issapintegrationprice: boolean
    catalogisenabled: boolean
    mediaonhvrisenabled: boolean
    isgrosspriceafterlogin: boolean
    isdecimalprecisionadd: boolean
    isshowthumbnailimg: boolean
    isairecommended: boolean
    quickviewisenabled: boolean
}

export interface Gloablsetting {
    decimalprecisionfinal: string
    minimumdecimalprecision: string
    fileversion: any
    globalsettingvalue: any
}

export interface Resource {
    addtobasket: string
    addtowishlist: string
    productcompare: string
    quickview: string
    iscallforprice: string
    minquantity: string
    aslowas: string
    catalogpresentation: string
    sectionviewall: string
    wishlistcheckbox: string
    loginrequiremsg: string
    detail: string
    removefromwishlistmsg: string
    reviewcountlbl: string
    yousave: string
    addcompare: string
    removecompare: string
    charhyphen: string
    viewproduct: any
    iscallpricecanada: any
    iscallpriceusa: any
    strpresentationbuttonpermission: any
    viewalltext: any
    stremptyspace: any
    maxqtyvalidation: string
    minqtyvalidation: string
    inventorywarning: string
    titlesuccess: string
    addsuccess: string
    addfailed: string
    sampeaddfailed: string
    quantityvalidation: string
    cartloginrequire: string
    maxinventory: string
    maxbasketqty: string
    viewallsimilarproduct: any
    elementdesc: any
    placeneworder: any
    heading: any
    noproducttitle: any
    pricetitle: any
    citytitle: any
    statetitle: any
    countrytitle: any
    changelocation: any
    pieces: any
    featured: any
    totalpriceheading: any
}
