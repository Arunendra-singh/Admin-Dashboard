export interface IMultilingualCustomTextResponse {
    status: number;
    message: string;
    data: Data;
}

export type Data = Record<string, CustomTextData>;

export interface CustomTextData {
    customtextguid: string;
    name: string;
    content: string;
}
