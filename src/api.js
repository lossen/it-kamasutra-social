import * as axios from "axios";
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
    followUser(user_id){
        return instance.post(`follow/${user_id}`)
            .then(response => response.data)
    },
    unfollowUser(user_id){
        return instance.delete(`follow/${user_id}`)
            .then(response => response.data)
    },
}

export const profileAPI = {
    getProfileData(userId){
        return instance.get(`profile/${userId}`)
            .then(response => response.data)
    },
    getProfileStatus(userId){
        return instance.get(`/profile/status/${userId}`).then(response => response.data)
    },
    setProfileStatus(status){
        return instance.put(`/profile/status`, {status})
    },
    addNewPost(post){
        return instance.post(`/profile/posts`, {post})
    },
    sendPhoto(image){
        const formData = new FormData();
        formData.append("image",image)
        return instance.put(`/profile/photo`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }).then(response => response.data)
    },
    saveProfile(data){
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
    sendNewMessage(body){
        return instance.post(`dialogs/${2}/messages`,{body},{

        }).then(response => response.data)
    },

}

export const authAPI = {
    checkLogin(){
        return instance.get(`auth/me/`).then(response => response.data)
    },
    login(email, password,rememberMe = false, captcha) {
        return instance.post('/auth/login', {
            email, password,rememberMe,captcha
        }).then(response => response.data)
    },
    logout() {
        return instance.delete('/auth/login').then(response => response.data)
    },
}
