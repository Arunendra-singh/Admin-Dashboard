export interface IDeleteBasketItemPayload {
    itemGuid: string;
    qty: number;
}

export interface IDeleteBasketItemResponse {
    statuscode: number;
    message: string;
    data: IDeleteBasketItemData;
}

export interface IDeleteBasketItemData {
    success: string;
    globalsetting: IGlobalsetting;
    featuresetting: IFeaturesetting;
}

export interface IGlobalsetting {
    ewizaiwebsiteguid: string;
}

export interface IFeaturesetting {
    issetupchargeproductlevel: boolean;
    isewizaifeatureenable: boolean;
    isenable: boolean;
    iscustomizeandorder: boolean;
}
