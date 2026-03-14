export interface ISavePOWithArtworkDetailsResponse {
    statusCode: number;
    message: string;
    data: string;
}

export interface ISavePOWithArtworkDetailsProps {
    PPAI: string;
    PoNumber: string;
    Instructions: string;
    EmailId: string;
    BillingInformation: BillingInformation;
    SubmitPOlist: SubmitPolist[];
}

export interface BillingInformation {
    BillingCompanyName: string;
    BillingFirstName: string;
    BillingPhone: string;
    BillingExtensionNo: string;
    BillingEmailId: string;
}

export interface SubmitPolist {
    SubmitPOGuid: string;
    SubmitPOFileName: string;
    SubmitPOFilePath: string;
}
