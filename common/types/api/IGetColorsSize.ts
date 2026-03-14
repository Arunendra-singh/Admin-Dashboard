export interface IGetColorSizeResponse {
    statuscode: number;
    message: string;
    data: Data;
};

export interface Data {
    productname: string,
    color: string,
    skuguidsize: [],
    productguid: string,
    maxorder: number,
    minorder: number,
    defaultskuguid: string,
    isdefault: boolean,
    image: string,
    imagealttext: string,
    skuguid: string,
    furtherdescription: string,
    description: string,
    islank: false,
    erpproductid: 0,
    erpskuid: string,
    perlotitems: string,
    hidestep1: false,
    setupcharge: 0,
    shownewcolor: string,
    createddateutc: string,
    isnewsku: false,
    customfield: string,
    decimalprecision: string,
    productcode: string,
    customfield2: string,
    _featuresetting: string
}
