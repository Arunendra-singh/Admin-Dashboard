export interface ICreateTemplatedResponse {
    statuscode: number;
    message: string;
    data: data;
}
export interface data {
    lstlayoutvariants: lstlayoutvarantsdata[]
    frontcoverimagetotalcount: number;
    lstfrontcover: lstfrontcoverdata[];
    lstlayout: lstlayoutdata[];
    templateorientation: string;
    type: string;
    title: string;
    backinnerimagetotalcount: number;
    frontinnerimagetotalcount: number;
    backcoverimagetotalcount: number;
    backgroundimagecotalcount: number;
    backgroundimagetotalcountcust: number;
    footerimagetotalcount: number;
    headerimagetotalcount: number;
    flyerthumbimagetotalcount: number;

}
export interface lstlayoutvarantsdata {
    variantguid: string;
    filename: string;
    type: string;
    variantimage: string;
    name: string;
    product: number;
    cataloggype: string;
    orientation: string;
    websiteguid: string;
    languageguid: string;
    pricenotsupported: any;
    exclusive: any

}
export interface lstfrontcoverdata {
    pageguid: string;
    pagetype: string;
    image: string;
    pagelayout: string;
    type: string;
    websiteguid: string;
    layoutguid: string;
    isadmincreated: boolean;
    languageguid: string;
    isdeleted: boolean;
    templatename: string;
}
export interface lstlayoutdata {
    websiteguid: string;
    type: string;
    product: number;
    layoutguid: string;
    layoutname: string;
    pagehtml: any;
    catalogyype: string;
    image: string;
    layoutvariants: string;
}
export interface ICreateTemplatedPayload {
    Layout: string;
    Type: string;
    LayoutGuid: string;
}
