import ProviderBase from "./providerBase";
import IOrder from "../models/IOrder";
import NotificationManager from "../tools/NotificationManager";

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


    static async createOrder(): Promise<boolean>{
        let url =  "/Order/CreateOrder";

        return await this.protectedPost(url)
            .then(async res => {

                if (res.status === 200) {
                    NotificationManager.makeSuccess(res.data);
                    return true;
                }

                return false;
            })
            .catch((res) => {
                NotificationManager.makeError(res.data);
                return false;
            });
    }

    static async getOrderReport(id: string){
        let url = "/Order/GetOrder?id=" + id;

        return await this.getFile(url)
            .then(async res => {

                if (res.status === 200) {

                    const href = URL.createObjectURL(res.data);

                    const link = document.createElement('a');
                    link.href = href;
                    link.setAttribute('download', 'Order.docx'); //or any other extension
                    document.body.appendChild(link);
                    link.click();

                    document.body.removeChild(link);
                    URL.revokeObjectURL(href);
                }

                NotificationManager.makeSuccess("Отчет по заказу скачан");

                return null;
            })
            .catch((e) => {
                console.log(e)
                NotificationManager.makeError("Ошибка генерации отчета");
                return null;
            });
    }
}