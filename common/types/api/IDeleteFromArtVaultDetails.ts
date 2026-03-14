export interface IArtworkDataPayload {
    ArtVaultGuid: string;
    WebSiteGuid: string;
}

export interface IDeleteFromArtVaultResponse {
    statuscode: number;
    data: boolean;
    message: string;
}
