import {GetItemsResponseType, instance, TResponse} from "./api";
import {TUser} from "../types/types";

export const usersAPI = {
    getUsers(page = 1, pageSize = 20) {
        return instance.get<GetItemsResponseType<TUser>>(`users?page=${page}&count=${pageSize}`)
            .then(response => response.data)
    },
    followUser(user_id: number) {
        return instance.post<TResponse>(`follow/${user_id}`)
            .then(response => response.data)
    },
    unfollowUser(user_id: number) {
        return instance.delete<TResponse>(`follow/${user_id}`)
            .then(response => response.data)
    },
}