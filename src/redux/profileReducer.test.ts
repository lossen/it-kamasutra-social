import profileReducer, {actionCreators} from "./profileReducer";

let state = {
    posts: [
        {id: 1, message: "hi", likesCount: 12},
        {id: 2, message: "how are you?", likesCount: 11},
        {id: 3, message: "me first post", likesCount: 0},
    ],
    profile: null,
    profileStatus: ""
}

it('New post should be added', () => {
    //input data
    let action = actionCreators.addPost("new post text");
    //action
    let newState = profileReducer(state, action)
    //expectation
    expect(newState.posts.length).toBe(4)
})

it('After deleting length of messages should me decrement', () => {
    //input data
    let action = actionCreators.deletePost(3);
    //action
    let newState = profileReducer(state, action)
    //expectation
    expect(newState.posts.length).toBe(2)
})

it(`If passed incorrect id, posts length shouldn't change`, () => {
    //input data
    let action = actionCreators.deletePost(1000);
    //action
    let newState = profileReducer(state, action)
    //expectation
    expect(newState.posts.length).toBe(3)
})

it(`Profile should be set`, () => {
    //input data
    let action = actionCreators.setUserProfile({
        "fullName": "snejinka",
        "userId": 23516,
    });
    //action
    let newState = profileReducer(state, action)
    //expectation
    expect(newState.profile).not.toBe(null)
})