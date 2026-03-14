export interface IGetOrderStatusFromDatabaseAPIPayload {
    customfield1: string;
    customfield2: string;
    customfield3: string;
    customfield4: string;
    customfield5: string;
    customfield6: string;
    customfield7: string;
    customfield8: string;
    customfield9: string;
    customfield10: string;
    customfield11: string;
    customfield12: string;
    customfield13: string;
    customfield14: string;
    customfield15: string;
    customfield16: string;
    customfield17: string;
    customfield18: string;
    customfield19: string;
    customfield20: string;
    customfield21: string;
    customfield22: string;
    customfield23: string;
    customfield24: string;
    customfield25: string;
}

export interface IGetOrderStatusFromDatabaseAPIResponse {
    statuscode: number;
    message: string;
    data: IGetOrderStatusFromDatabaseAPIData;
}

export interface IGetOrderStatusFromDatabaseAPIData {
    userdetails: any;
    customfield2: any;
    featuresetting: Featuresetting;
    gloablsetting: Gloablsetting;
    listordershipping: Listordershipping[];
    lstorderstatusesall: Lstorderstatusesall[];
    lstorderstatuses: any[];
}

export interface Featuresetting {
    isloginwithusername: boolean;
}

export interface Gloablsetting {
    lastdays: string;
}

export interface Listordershipping {
    websiteguid: string;
    languageguid: any;
    customfield1: string;
    customfield2: string;
    customfield3: string;
    customfield4: string;
    customfield5?: string;
    customfield6?: string;
    customfield7: string;
    customfield8: string;
    customfield9: string;
    customfield10: string;
    customfield11?: string;
    customfield12: string;
    customfield13?: string;
    customfield14: string;
    customfield15: string;
    customfield16?: string;
    customfield17?: string;
    customfield18?: string;
    customfield19?: string;
    customfield20?: string;
    customfield21: any;
    customfield22: any;
    customfield23: any;
    customfield24: any;
    customfield25: any;
}

export interface Lstorderstatusesall {
    websiteguid: string;
    languageguid: any;
    customfield1: string;
    customfield2: string;
    customfield3: string;
    customfield4: string;
    customfield5?: string;
    customfield6?: string;
    customfield7: string;
    customfield8: string;
    customfield9: string;
    customfield10: string;
    customfield11?: string;
    customfield12: string;
    customfield13?: string;
    customfield14: string;
    customfield15: string;
    customfield16?: string;
    customfield17?: string;
    customfield18?: string;
    customfield19?: string;
    customfield20?: string;
    customfield21: any;
    customfield22: any;
    customfield23: any;
    customfield24: any;
    customfield25: any;
}
