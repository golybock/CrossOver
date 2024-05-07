import ProviderBase from "./providerBase";
import IProduct from "../models/iProduct";
import ICategory from "../models/ICategory";

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

    static async search(search: string, sortType: number): Promise<Array<IProduct>>{
        let url =  "/Product/Search?search=" + search + "&sortType=" + sortType;

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

    static async getCategories(): Promise<Array<ICategory>>{
        let url =  "/Product/GetCategories";

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