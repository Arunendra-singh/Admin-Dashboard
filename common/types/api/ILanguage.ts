export interface ILanguageResponse {
    statuscode: number
    message: string
    data: Data
}

export interface Data {
    languagelist: Languagelist[]
    defaultlanguageguid: string
    languageguid: string
    resources: Resources
}

export interface Languagelist {
    languageguid: string
    languagename: string
    languagealias: string
    culturecode: string
}

export interface Resources {
    selectlanguage: string
}
