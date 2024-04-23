import ProviderBase from "./providerBase";
import {AuthWrapper} from "../auth/AuthWrapper";
import ISignUpBlank from "../models/ISignUpBlank";

export default class AuthProvider extends ProviderBase{

    static async signIn(email: string, password: string): Promise<boolean | string> {

        let url = this.baseAddress + "/Auth/SignIn?login=" + email + "&password=" + password;

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

        let url = this.baseAddress + "/Auth/SignUp";

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

        let url = this.baseAddress + "/Auth/SignOut";

        return await this.post(url, null)
            .then(async res => {
                return res.status === 200;
            })
            .catch(() => {
                return false;
            });
    }

}