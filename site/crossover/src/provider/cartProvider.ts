import ProviderBase from "./providerBase";
import ICart from "../models/ICart";

export default class CartProvider extends ProviderBase{

    static async getCarts(): Promise<Array<ICart>>{
        let url =  "/Cart/GetCart";

        return await this.protectedGet(url)
            .then(async res => {

                if (res.status === 200) {
                    return res.data;
                }

                return null;
            })
            .catch(() => {
                return [];
            });
    }

    static async addToCart(productId: number, count: number) : Promise<boolean>{
        let url =  "/Cart/AddToCart?productId=" + productId + "&count=" + count;

        return await this.post(url, null)
            .then(async res => {
                return res.status === 200;
            })
            .catch(() => {
                return false;
            });
    }

    static async removeFromCart(productId: number, count: number) : Promise<boolean>{
        let url =  "/Cart/RemoveFromCart?productId=" + productId;

        return await this.post(url, null)
            .then(async res => {
                return res.status === 200;
            })
            .catch(() => {
                return false;
            });
    }

}