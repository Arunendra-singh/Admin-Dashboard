export interface IGetOptimizerSearch {
    statuscode: number
    message: string
    data: Data
}

export interface Data {
    productcount: number
    collectionguids: Collectionguid[]
    productlstdata: Productlstdaum[]
    resource: Resource
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
    description: any
    productimageurl: string
    price: number
    isaddedinwishlist: boolean
    productrating: number
    lastupdatedon: any
    tagattributes: any
    productlikes: number
    downloadscount: number
    detailurl: string
    islike: boolean
    isdownloaded: boolean
    isreiewed: boolean
    collectionname: any
    collectionalias: any
    customfield: any
    collectionguids: Collectionguid2[]
    pricingguid: string
    featurediconsvm: any
    swatches: string[]
    productnewskuvm: Productnewskuvm[]
    productmediavm: any[]
    eventthemes: Eventtheme[]
    industries: Industry[]
    strikeprice: number
    furtherdescription: string
    notetext: string
    skucount: number
    isincludesubscription: boolean
    seodetails: Seodetail[]
}

export interface Collectionguid2 {
    collectionguid: string
    collectiontype: string
    userguids: any
    collectionimagename: string
}

export interface Productnewskuvm {
    inventory: number
    skuguid: string
    sku: string
    variantname: string
    imagename: string
    imagealttext: string
    prodprices: any
    customfield: any
    price: number
    strikeprice: number
    pricingguid: string
    isdefault: boolean
}

export interface Eventtheme {
    key: string
    value: string
}

export interface Industry {
    key: string
    value: string
}

export interface Seodetail {
    pagetitle: string
    metakeyword: string
    metadescription: string
    canonical: string
    metarobots: string
}

export interface Resource {
    showingcardrecords: string
    showingcardrecordspaging: string
    aslowas: string
    minquantity: string
    quickview: string
    addtobasket: string
    addtowishlist: string
    viewproduct: string
    compare: string
    callforprice: string
    catalogpresentation: string
    details: string
    wishlistcheckbox: string
    wishlistloginrequired: string
    removefromwishlistmsg: string
    reviewcount: string
    removewishlist: string
    removecompare: string
    presentationproductremoved: string
    iscallforpricecanada: string
    iscallforpriceusa: string
    getproductcount: any
    yousave: string
    maxqtyvalidation: string
    minqtyvalidation: string
    inventorywarning: string
    titlesuccess: string
    addsuccess: string
    addfailed: string
    sampleaddfailed: string
    quantityvalidation: string
    cartloginrequired: string
    maxinventory: string
    maxquantity: string
    addcompare: string
    charhyphen: string
    emptyspace: string
    presentationbuttonpermission: string
    expirationdate: string
    instock: string
    noproductfound: string
    quickviewpopup: string
}
