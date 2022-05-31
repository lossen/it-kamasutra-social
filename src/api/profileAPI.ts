import {TPhotos, TProfile} from '../types/types';
import {instance, TAPIResponse} from './api';

export const profileAPI = {
    getProfileData(userId: number) {
        return instance.get<TProfile>(`profile/${userId}`)
            .then(response => response.data);
    },
    getProfileStatus(userId: number) {
        return instance.get<string>(`/profile/status/${userId}`).then(response => response.data);
    },
    setProfileStatus(status: string) {
        return instance.put<TAPIResponse>(`/profile/status`, {status});
    },
    addNewPost(newPostText: string) {
        return instance.post(`/profile/posts`, {post: newPostText})
            .then(response => response.data);
    },
    sendPhoto(image: File) {
        const formData = new FormData();
        formData.append('image', image);
        return instance.put<TAPIResponse<{ photos: TPhotos }>>(`/profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => response.data);
    },
    saveProfile(data: TProfile) {
        return instance.put<TAPIResponse>(`/profile`, {...data})
            .then(response => response.data);
    },
};