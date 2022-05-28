import {addPostThunkCreator} from '../../../redux/profileReducer';
import MyPosts from './MyPosts';
import {connect} from 'react-redux';
import {AppStateType} from '../../../redux/reduxStore';

const mapStateToProps = (state:AppStateType) => ({
    posts: state.profilePage.posts,
})

const MyPostsContainer = connect<TStateProps,TDispatchProps>(mapStateToProps, {
    addPostThunkCreator
})(MyPosts);

export default MyPostsContainer;

type TStateProps = ReturnType<typeof mapStateToProps>
type TDispatchProps = {
    addPostThunkCreator: (newPostText:string) => void
}