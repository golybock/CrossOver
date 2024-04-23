import IProduct from "./iProduct";

export default interface IOrderProduct{
    id: number;
    orderId: number;
    productId: number;
    count: number;
    product: IProduct;
}