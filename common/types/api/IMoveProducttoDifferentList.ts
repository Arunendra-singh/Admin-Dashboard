export interface IMoveProducttoDifferentListResponse {
    statusCode: number;
    message: string;
    data: string;
}

export interface IMoveProducttoDifferentListProps {
    moveTo: string;
    productGuid: string;
    selectedListName: string;
}
