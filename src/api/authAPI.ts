import {instance, TResponse} from "./api";

type CheckLoginResponseDataType = {
        id: number
        email: string
        login: string
}
type LoginResponseType = {
    userId: number
}

export const authAPI = {
    checkLogin() {
        return instance.get<TResponse<CheckLoginResponseDataType>>(`auth/me/`).then(response => response.data)
    },
    login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
        return instance.post<TResponse<LoginResponseType>>('/auth/login', {
            email, password, rememberMe, captcha
        }).then(response => response.data)
    },
    logout() {
        return instance.delete<TResponse>('/auth/login').then(response => response.data)
    },
}