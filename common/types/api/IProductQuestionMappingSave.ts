export interface IProductQuestionMappingSave {
    statuscode: number;
    message: string;
    data: any;
}

export type ProductQuestionMappingSavePayload = ProductQuestionMappingObject[];

export interface ProductQuestionMappingObject {
    QuestionAnswerGuid: string;
    ProductGuid: string;
    IsAllSku: boolean;
    SelectedSkus: any;
    OldSelectedSkus: any;
    OldSelectedProducts: any;
}
