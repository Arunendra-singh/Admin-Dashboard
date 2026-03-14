export interface IGetAllStateResponse {
    statuscode: number;
    message: string;
    data: StateData[];
}

export interface StateData {
    stateguid: string;
    name: string;
    abbreviation: string;
    countryguid: string;
    websiteguid: string;
    isactive: boolean;
    ipaddress: any;
    createdby: string;
    createddateutc: string;
    modifiedby: string;
    modifieddateutc: string;
    createddateutcunix: number;
    modifieddateutcunix: number;
}
