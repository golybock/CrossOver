import IWindow from "./IWindowRequestWindow";

export default interface IWindowRequest{
    city: string;
    name: string;
    phone: string;
    email: string;
    description: string;
    window: IWindow;
}