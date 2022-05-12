import axios from "axios";
import {PostType, ProfileType} from "./types/types";
const API_URL = 'https://social-network.samuraijs.com/api/1.0/';
const API_KEY = process.env.REACT_APP_API_KEY;

const instance = axios.create({
    withCredentials: true,
    baseURL: API_URL,
    headers: {
        'api-key': API_KEY
    }
})

export const usersAPI = {
    getUsers(page = 1,pageSize = 20) {
        return instance.get(`users?page=${page}&count=${pageSize}`)
            .then(response => response.data)
    },
    followUser(user_id:number){
        return instance.post(`follow/${user_id}`)
            .then(response => response.data)
    },
    unfollowUser(user_id:number){
        return instance.delete(`follow/${user_id}`)
            .then(response => response.data)
    },
}

export const profileAPI = {
    getProfileData(userId:number){
        return instance.get(`profile/${userId}`)
            .then(response => response.data)
    },
    getProfileStatus(userId:number){
        return instance.get(`/profile/status/${userId}`).then(response => response.data)
    },
    setProfileStatus(status:string){
        return instance.put(`/profile/status`, {status})
    },
    addNewPost(newPostText:string){
        return instance.post(`/profile/posts`, {post:newPostText})
            .then(response => response.data)
    },
    sendPhoto(image:File){
        const formData = new FormData();
        formData.append("image",image)
        return instance.put(`/profile/photo`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }).then(response => response.data)
    },
    saveProfile(data:ProfileType){
        return instance.put(`/profile`, {...data})
            .then(response => response.data)
    },
}

export const securityAPI = {
    getCaptchaUrl(){
        return instance.get(`/security/get-captcha-url`)
            .then(response => response.data)
    }
}

export const dialogsAPI = {
    sendNewMessage(body:string){
        return instance.post(`dialogs/${2}/messages`,{body},{

        }).then(response => response.data)
    },

}

type CheckLoginResponseType = {
    data: {
        id: number
        email: string
        login: string
    }
    resultCode: ResultCodesEnum
    messages: Array<string>
}

type LoginResponseType = {
    data: {
        userId: number
    }
    resultCode: ResultCodesEnum
    messages: Array<string>
}

type LogoutResponseType = {
    data: {}
    resultCode: ResultCodesEnum
    messages: Array<string>
}

export enum ResultCodesEnum {
    Success = 0,
    Error = 1,
    CaptchaIsRequired = 10,
}

export const authAPI = {
    checkLogin(){
        return instance.get<CheckLoginResponseType>(`auth/me/`).then(response => response.data)
    },
    login(email:string, password:string,rememberMe = false, captcha: null | string = null) {
        return instance.post<LoginResponseType>('/auth/login', {
            email, password,rememberMe,captcha
        }).then(response => response.data)
    },
    logout() {
        return instance.delete<LogoutResponseType>('/auth/login').then(response => response.data)
    },
}
