import usersReducer, {actionCreators, TInitialState} from './usersReducer';
let state: TInitialState ;

beforeEach(() => {
    state = {
        users: [
            {
                id: 1,
                name: 'Anna',
                status: 'status text',
                photos: {
                    large: 'https://dummyimage.com/600x400/000/fff',
                    small: 'https://dummyimage.com/600x400/000/ddd'
                },
                followed: false
            },
            {
                id: 2,
                name: 'Max',
                status: 'status text',
                photos: {
                    large: 'https://dummyimage.com/600x400/000/fff',
                    small: 'https://dummyimage.com/600x400/000/ddd'
                },
                followed: false
            },
            {
                id: 3,
                name: 'Regi',
                status: 'status text',
                photos: {
                    large: 'https://dummyimage.com/600x400/000/fff',
                    small: 'https://dummyimage.com/600x400/000/ddd'
                },
                followed: true
            },
            {
                id: 4,
                name: 'Marta',
                status: 'status text',
                photos: {
                    large: 'https://dummyimage.com/600x400/000/fff',
                    small: 'https://dummyimage.com/600x400/000/ddd'
                },
                followed: true
            }

        ],
        pageSize: 100,
        totalUsersCount: 21,
        currentPage: 1,
        isFetching: false,
        followingProgressQueue: []
    };
})
describe("Following flow", () => {
    test('Followed successfully', () => {
        const newState = usersReducer(state, actionCreators.followUser(2));
        expect(newState.users[0].followed).toBeFalsy();
        expect(newState.users[1].followed).toBeTruthy();
    });

    test('Unfollowed successfully', () => {
        const newState = usersReducer(state, actionCreators.unfollowUser(4));
        expect(newState.users[2].followed).toBeTruthy();
        expect(newState.users[3].followed).toBeFalsy();
    });
})
