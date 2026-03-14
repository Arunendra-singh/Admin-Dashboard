export interface IGetGlobalSettings {
    statuscode: number;
    message: string;
    data: data[];
}

export interface data {
    globalsetting: GlobalSettingsDataResponse;
}

export type GlobalSettingsPayload = GlobalSettingsObject[];

export type GlobalSettingsDataResponse = GlobalSettingsValue[];

export interface GlobalSettingsObject {
    CatalogGuid: string;
    GlobalSetting: GlobalSettingsValue[];
}

export interface GlobalSettingsValue {
    checkedvalue: boolean;
    flag: Int8Array;
    websiteguid: string;
    languageguid: string;
    groupkey: string;
    globalsettingguid: string;
    groupname: string;
    key: string;
    value: string
}
