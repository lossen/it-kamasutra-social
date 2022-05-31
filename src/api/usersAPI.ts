import {GetItemsResponseType, instance, TAPIResponse} from './api';
import {TUser} from '../types/types';
import {TFilter} from '../redux/usersReducer';

export const usersAPI = {
    getUsers(page = 1, pageSize = 20, filter:TFilter) {
        let $term = filter.term ? `&term=${filter.term}` : '';
        let $friend = filter.friend ? `&friend=${filter.friend}` : '';
        return instance.get<GetItemsResponseType<TUser>>(`users?page=${page}&count=${pageSize}${$term}${$friend}`)
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