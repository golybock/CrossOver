import IClient from "./IClient";
import IProduct from "./iProduct";

export default interface ICart{
    id: number;
    productId: number;
    count: number;
    clientId: number;
    client: IClient;
    product: IProduct;
}