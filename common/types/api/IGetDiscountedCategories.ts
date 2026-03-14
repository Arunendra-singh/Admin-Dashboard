export interface IGroupDiscount {
    statuscode: number;
    message: string;
    data: GroupDiscountList[];
}

export interface GroupDiscountList {
    categoryguid: string;
    categoryname: string;
    aliasname: string;
    imagename: string;
    promodescription: string;
    groupdiscountpercentage: number;
}
