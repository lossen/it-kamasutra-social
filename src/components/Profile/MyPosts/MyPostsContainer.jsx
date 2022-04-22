import {addPost, updateNewPostText} from "../../../redux/profileReducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";

const mapStateToProps = (state) => ({
    posts: state.profilePage.posts,
    newPostText: state.profilePage.newPostText  ,
})

const mapDispatchToProps = (dispatch) => ({
    updateNewPostText: (text) => dispatch(updateNewPostText(text)),
    addPost: () => dispatch(addPost())
})

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;