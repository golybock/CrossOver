﻿import ProviderBase from "./providerBase";
import {AuthWrapper} from "../auth/AuthWrapper";
import ISignUpBlank from "../models/ISignUpBlank";
import IClient from "../models/IClient";

export default class AuthProvider extends ProviderBase{

    static async signIn(email: string, password: string): Promise<boolean | string> {

        let url = "/Auth/SignIn?login=" + email + "&password=" + password;

        return await this.post(url, null)
            .then(async res => {

                if(res.status === 200){
                    AuthWrapper.userSignIn(res.data);
                    return true;
                }

                return false;
            })
            .catch((res) => {

                if(res.status == 401){
                    return res.data;
                }

                return false;
            });
    }

    static async signUp(signUpBlank: ISignUpBlank): Promise<boolean | string> {

        let url = "/Auth/SignUp";

        return await this.post(url, signUpBlank)
            .then(async res => {
                if(res.status === 200){
                    AuthWrapper.userSignIn(res.data);
                    return true;
                }

                return false;
            })
            .catch((res) => {

                if(res.status == 400){
                    return res.data;
                }

                return false;
            });
    }

    static async signOut(): Promise<boolean> {

        let url = "/Auth/SignOut";

        return await this.post(url, null)
            .then(async res => {
                return res.status === 200;
            })
            .catch(() => {
                return false;
            });
    }

    static async getMe(): Promise<IClient> {

        let url = "/Auth/GetMe";

        return await this.protectedGet(url)
            .then(async res => {

                if(res.status === 200){
                    return res.data;
                }

                return false;
            })
            .catch((res) => {

                if(res.status == 401){
                    return res.data;
                }

                return false;
            });
    }

}