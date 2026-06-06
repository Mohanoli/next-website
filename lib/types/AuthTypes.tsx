
import { Dispatch, SetStateAction, } from "react";
export interface IUser {
    id: number;
    fullName: string;
    username: string;
    email: string;
    role: string;
    image?: string;
    gender?: string;
}

export interface IAuthContext {
    user: IUser | null;
    isLoading: boolean;

    setAuth: (token: string, user: IUser) => void;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
    logout: () => void;
    leftSection: {
        title: string;
        subTitle: string;
        link: {
            url: string;
            txt: string;
        };
    };
    setLeftSection: Dispatch<
        SetStateAction<{
            title: string;
            subTitle: string;
            link: {
                url: string;
                txt: string;
            };
        }>
    >;
}


export interface ICredentials {
    email: string;
    password: string;
}