import ProviderBase from "./providerBase";
import IProduct from "../models/iProduct";

export default class ProductProvider extends ProviderBase{


    static async getProducts(): Promise<Array<IProduct>>{
        let url =  "/Product/GetProducts";

        return await this.get(url)
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

}