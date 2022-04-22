const FOLLOW_USER = 'FOLLOW_USER',
UNFOLLOW_USER = 'UNFOLLOW_USER',
SET_USERS = 'SET_USERS',
SET_CURRENT_PAGE = 'SET_CURRENT_PAGE',
SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT',
SET_FETCHING = 'SET_FETCHING';

let initialState = {
    // users: [
    //     {
    //         id: 0,
    //         name: 'Anechka',
    //         avatar: 'https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=988&q=80',
    //         status: 'At work',
    //         location: {
    //             country: 'Russia',
    //             city: 'Omsk',
    //         },
    //         followed: true
    //     },
    //     {
    //         id: 1,
    //         name: 'Maxim',
    //         avatar: 'https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=988&q=80',
    //         status: 'Looking for a job',
    //         location: {
    //             country: 'Russia',
    //             city: 'Omsk',
    //         },
    //         followed: false
    //     },
    //     {
    //         id: 2,
    //         name: 'Regi',
    //         avatar: 'https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=988&q=80',
    //         status: 'Looking for a job',
    //         location: {
    //             country: 'Russia',
    //             city: 'Omsk',
    //         },
    //         followed: false
    //     }
    // ],
    users: [],
    pageSize: 100,
    totalUsersCount: 21,
    currentPage: 1,
    isFetching: false,

};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW_USER:
            return {
                ...state,
                users: [...state.users.map(user => {
                    if(user.id === action.user_id) return {...user, followed: true}
                    return user;
                })]
            }
        case UNFOLLOW_USER:
            return {
                ...state,
                users: [...state.users.map(user => {
                    if(user.id === action.user_id) return {...user, followed: false}
                    return user;
                })]
            }
        case SET_USERS:
            return {
                ...state,
                users: action.users
            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage
            }
        case SET_TOTAL_USERS_COUNT:
            return {
                ...state,
                totalUsersCount: action.totalUsersCount
            }
        case SET_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }
        default:
            return state;
    }
}

//action creators
export const followUser = (user_id) => {
    return {
        type: FOLLOW_USER,
        user_id
    }
}

export const unfollowUser = (user_id) => {
    return {
        type: UNFOLLOW_USER,
        user_id
    }
}

export const setUsers = (users) => {
    return {
        type: SET_USERS,
        users
    }
}

export const setCurrentPage = (currentPage) => {
    return {
        type: SET_CURRENT_PAGE,
        currentPage
    }
}

export const setTotalUsersCount = (totalUsersCount) => {
    return {
        type: SET_TOTAL_USERS_COUNT,
        totalUsersCount
    }
}

export const setFetching = (isFetching) => {
    return {
        type: SET_FETCHING,
        isFetching
    }
}
//end action creators
export default usersReducer;