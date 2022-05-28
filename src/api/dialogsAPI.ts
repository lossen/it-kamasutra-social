import {instance} from './api';

export const dialogsAPI = {
    sendNewMessage(body: string) {
        return instance.post(`dialogs/${2}/messages`, {body}, {}).then(response => response.data)
    },

}