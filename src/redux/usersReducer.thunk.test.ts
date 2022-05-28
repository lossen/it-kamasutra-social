import {actionCreators, followUser, unfollowUser} from './usersReducer';
import {usersAPI} from '../api/usersAPI';
import {ResultCodesEnum, TAPIResponse} from '../api/api';

jest.mock('../api/usersAPI');
const usersAPIMock = usersAPI as jest.Mocked<typeof usersAPI>;
const dispatchMock = jest.fn();
const getStateMock = jest.fn();

beforeEach(() => {
    dispatchMock.mockClear()
    getStateMock.mockClear()
    usersAPIMock.followUser.mockClear()
    usersAPIMock.unfollowUser.mockClear()
})

const result:TAPIResponse = {
    resultCode: ResultCodesEnum.Success,
    data: {resultCode: ResultCodesEnum.Success},
    messages: ['']
}
describe("Users reducers thunks tests", () => {
    test("Success follow thunk", async () => {
        usersAPIMock.followUser.mockReturnValue(Promise.resolve(result))
        const userId = 1;
        const thunkCreator = followUser(userId);

        // @ts-ignore
        await thunkCreator(dispatchMock, getStateMock, {})

        expect(dispatchMock).toBeCalledTimes(3)
        expect(dispatchMock).toHaveBeenNthCalledWith(1, actionCreators.toggleFollowingIsFetching(true, userId))
        expect(dispatchMock).toHaveBeenNthCalledWith(2, actionCreators.followUser(userId))
        expect(dispatchMock).toHaveBeenNthCalledWith(3, actionCreators.toggleFollowingIsFetching(false, userId))

    })
    test("Success unfollow thunk", async () => {
        usersAPIMock.unfollowUser.mockReturnValue(Promise.resolve(result))
        const userId = 1;
        const thunkCreator = unfollowUser(userId);

        await thunkCreator(dispatchMock, getStateMock, {})

        expect(dispatchMock).toBeCalledTimes(3)
        expect(dispatchMock).toHaveBeenNthCalledWith(1, actionCreators.toggleFollowingIsFetching(true, userId))
        expect(dispatchMock).toHaveBeenNthCalledWith(2, actionCreators.unfollowUser(userId))
        expect(dispatchMock).toHaveBeenNthCalledWith(3, actionCreators.toggleFollowingIsFetching(false, userId))

    })
})
