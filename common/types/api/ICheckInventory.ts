export interface ICheckInventoryResponse {
    statusCode: number;
    message: string;
    data: ICheckInventoryData[];
}
export interface ICheckInventoryData {
    productvariantName: string;
    productvariant: string;
    quantityAvailable: string;
    errorMsg: any;
    imageName: any;
    poInventory: number;
    poDate: any;
    poFlag: boolean;
    noStockFlag: boolean;
    quantityOnOrder: any;
    replenishmentDate: any;
    madeToOrder: boolean;
    isActive: boolean;
    productCode: any;
    productName: any;
}
