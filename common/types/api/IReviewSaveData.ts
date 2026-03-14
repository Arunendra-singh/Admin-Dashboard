export interface ReviewSaveDataProps {
    Rating: string;
    ReviewTitle: string;
    ReviewDescription: string;
    ProductCode: string;
    ProductGuid: string;
    ProductName: string;
    CreatedBy: string;
    ImageUrl: string;
}
export interface ReviewSaveDataResponse {
    statusCode: string;
    message: string;
}
