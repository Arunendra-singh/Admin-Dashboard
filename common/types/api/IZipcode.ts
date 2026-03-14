export interface IZipcodeResponse {
    statuscode: number;
    message: string;
    data: IZipcodeData;
}

export interface IZipcodeData {
    country: string;
    countryguid: string;
    state: string;
    stateguid: string;
    city: string;
}

export interface IZipCodePayload {
    zipCode: string;
    country: string;
}
