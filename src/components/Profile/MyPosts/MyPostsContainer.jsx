import {addPostThunkCreator} from "../../../redux/profileReducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";

const mapStateToProps = (state) => ({
    posts: state.profilePage.posts,
})

const MyPostsContainer = connect(mapStateToProps, {
    addPostThunkCreator
})(MyPosts);

export default MyPostsContainer;