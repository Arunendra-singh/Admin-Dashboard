export interface IGetAllQuestionsResponse {
    statuscode: number;
    message: string | null;
    success: boolean;
    data: IGetAllQuestions[]; // Replace with the appropriate name for your data type
}

export interface IGetAllQuestions {
    websiteGuid: string | null;
    languageGuid: string | null;
    questionAnswerGuid: string;
    questionTitle: string;
    questionTitleShow: boolean;
    inputTypeForAdmin: string;
    inputValidationForOwner: string | null;
    displayOrder: number;
    combinedCodeOrder: number;
    applyForAllProducts: boolean;
    setupRunCharges: number;
    choices: boolean;
    choicesName: string | null;
    dependentQuestion: string | null;
    visibility: boolean;
    choicesOptions: any[] | null;
    choicesOptionsWithQuantity: any[] | null;
    textboxOptions: string | null;
    extraQuestions: string | null;
    randomId: string;
    isColorType: boolean;
    isReadQuantity: boolean;
    isQuestionHide: boolean;
    isShowZeroPrice: boolean;
    isShowAvailableOption: boolean;
    isMultiplyByPrice: boolean;
    isMultiselect: boolean;
    isChoicesYesWithQuantity: boolean;
    isSetupChargeInclude: boolean;
    isDefaultSelected: boolean;
    isExcludeSetupcharge: boolean;
    forVS: boolean;
    isTextColor: boolean;
    className: string | null;
    isAddParentDiv: boolean;
    isSelectVsNoneVisible: boolean;
    isActive: boolean | null;
    ipAddress: string | null;
    createdBy: string | null;
    createdDateUtc: string | null;
    modifiedBy: string | null;
    modifiedDateUtc: string | null;
    isDeleted: boolean | null;
}
