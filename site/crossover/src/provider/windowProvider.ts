import ProviderBase from "./providerBase";
import IWindowRequest from "../models/IWindowRequest";
import IOption from "./IOption";

export default class WindowProvider extends ProviderBase{
    static async getSectionTypes(): Promise<IOption[]>{
        let url =  "/Window/GetSectionTypes";

        return await this.get(url)
            .then(async res => {

                if (res.status === 200) {
                    return this.mapToOption(res.data);
                }

                return [];
            })
            .catch(() => {
                return [];
            });
    }

    static async getWindowTypes(): Promise<IOption[]>{
        let url =  "/Window/GetWindowTypes";

        return await this.get(url)
            .then(async res => {

                if (res.status === 200) {
                    return this.mapToOption(res.data);
                }

                return [];
            })
            .catch(() => {
                return [];
            });
    }

    static async getPackets(): Promise<IOption[]>{
        let url =  "/Window/GetPackets";

        return await this.get(url)
            .then(async res => {

                if (res.status === 200) {
                    return this.mapToOption(res.data);
                }

                return [];
            })
            .catch(() => {
                return [];
            });
    }

    static async getColors(): Promise<IOption[]>{
        let url =  "/Window/GetColors";

        return await this.get(url)
            .then(async res => {

                if (res.status === 200) {
                    return this.mapToOption(res.data);
                }

                return [];
            })
            .catch(() => {
                return [];
            });
    }

    static async createRequest(windowRequest:IWindowRequest) : Promise<boolean>{
        let url =  "/Window/CreateRequest";

        return await this.post(url, windowRequest)
            .then(async res => {
                return res.status === 200;
            })
            .catch(() => {
                return false;
            });
    }

    static mapToOption(data: any[]): IOption[]{
        return data.map(o => {return{label: o.name, value: o.id}});
    }
}