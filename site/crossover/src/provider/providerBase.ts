import axios from "axios";
import {AuthWrapper} from "../auth/AuthWrapper";

export default class ProviderBase {
    // todo add to config
    static baseAddress = "https://localhost:7168/api";

    constructor() {
        axios.defaults.withCredentials = true
    }

    protected static async get(url: string) {

        let token = AuthWrapper.user();

        const res = await axios.get(this.baseAddress + url);

        if (res.status == 401) {
            AuthWrapper.userSignOut();
        }

        return res;
    }

    protected static async protectedGet(url: string) {

        let token = AuthWrapper.user();

        const res = await axios.get(this.baseAddress + url, {headers: {"Authorization": `Bearer ${token}`}});

        if (res.status == 401) {
            AuthWrapper.userSignOut();
        }

        return res;
    }

    protected static async protectedPost(url: string) {

        let token = AuthWrapper.user();

        const res = await axios.post(this.baseAddress + url, null, {headers: {"Authorization": `Bearer ${token}`}});

        if (res.status == 401) {
            AuthWrapper.userSignOut();
        }

        return res;
    }

    protected static async getFile(url: string) {

        let token = AuthWrapper.user();

        const res = await axios.get(this.baseAddress + url, {headers: {"Authorization": `Bearer ${token}`}, responseType: "blob"});

        if (res.status == 401) {
            AuthWrapper.userSignOut();
        }

        return res;
    }

    protected static async post(url: string, data: any) {

        let token = AuthWrapper.user();

        const res = await axios.post(this.baseAddress + url, data, {headers: {"Authorization": `Bearer ${token}`}});

        if (res.status == 401) {
            AuthWrapper.userSignOut();
        }

        return res;
    }

    protected static async put(url: string, data: any) {

        let token = AuthWrapper.user();

        const res = await axios.put(this.baseAddress + url, data, {headers: {"Authorization": `Bearer ${token}`}});

        if (res.status == 401) {
            AuthWrapper.userSignOut();
        }

        return res;
    }

    protected static async delete(url: string) {

        let token = AuthWrapper.user();

        const res = await axios.delete(this.baseAddress + url, {headers: {"Authorization": `Bearer ${token}`}});

        if (res.status == 401) {
            AuthWrapper.userSignOut();
        }

        return res;
    }
}