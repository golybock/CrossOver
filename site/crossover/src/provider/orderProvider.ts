import ProviderBase from "./providerBase";
import IOrder from "../models/IOrder";

export default class OrderProvider extends ProviderBase{


    static async getOrders(): Promise<Array<IOrder>>{
        let url =  "/Order/GetOrders";

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

}