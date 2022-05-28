import axios from "axios";

const API_URL = 'https://social-network.samuraijs.com/api/1.0/';
const API_KEY = process.env.REACT_APP_API_KEY;

export const instance = axios.create({
    withCredentials: true,
    baseURL: API_URL,
    headers: {
        'api-key': API_KEY
    }
})

export enum ResultCodesEnum {
    Success = 0,
    Error = 1,
    CaptchaIsRequired = 10,
}

export type GetItemsResponseType<T> = {
    items: Array<T>
    totalCount: number
    error: string
}
export type TAPIResponse<D = {}, RC = ResultCodesEnum> = {
    data: D,
    resultCode: RC
    messages: Array<string>
}