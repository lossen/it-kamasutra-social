import {instance} from './api';

type TCaptchaUrl = { url: string }
export const securityAPI = {
    getCaptchaUrl() {
        return instance.get<TCaptchaUrl>(`/security/get-captcha-url`)
            .then(response => response.data)
    }
}