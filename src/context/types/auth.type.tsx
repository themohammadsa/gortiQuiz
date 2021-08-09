import { statsType } from "./initialStateType.type";

export type UserType = {
    token: string | null,
    name: string,
    email: string,
    setToken: Function,
    setName: Function,
    setEmail: Function,
};

export type AuthResponseType = {
    success: boolean,
    message?: string,
    name?: string,
    token?: string
}

export type ResultType = {
    success: boolean,
    message?: string,
    stats?: statsType[]
}