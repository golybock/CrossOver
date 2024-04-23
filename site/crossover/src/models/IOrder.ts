import IStatus from "./IStatus";
import IOrderProduct from "./IOrderProduct";
import IClient from "./IClient";

export default interface IOrder{
    id: number;
    date: Date;
    clientId: number;
    statusId: number;
    client: IClient;
    orderProducts: IOrderProduct[];
    status: IStatus;
}