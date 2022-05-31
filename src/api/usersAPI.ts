import {GetItemsResponseType, instance, TAPIResponse} from './api';
import {TUser} from '../types/types';

export const usersAPI = {
    getUsers(page = 1, pageSize = 20, term = '') {
        return instance.get<GetItemsResponseType<TUser>>(`users?page=${page}&count=${pageSize}&term=${term}`)
            .then(response => response.data);
    },
    followUser(user_id: number) {
        return instance.post<TAPIResponse>(`follow/${user_id}`)
            .then(response => response.data);
    },
    unfollowUser(user_id: number) {
        return instance.delete<TAPIResponse>(`follow/${user_id}`)
            .then(response => response.data);
    },
};