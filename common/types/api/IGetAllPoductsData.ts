import { type IProduct } from "../../interfaces/IProduct";

type IGetAllProductsData = Pick<IProduct, "productguid" | "productcode" | "productname"> & Partial<IProduct>;

export default IGetAllProductsData;
