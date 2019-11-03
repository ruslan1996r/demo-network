import { addPostActionCreator } from "../../../redux/profile-reducer";
import MyPost from "./MyPost";
import { connect } from "react-redux";

let mapStateToProps = state => {
  let { posts, newPostText } = state.profilePage;
  return {
    posts,
    newPostText
  };
};

let mapDispatchToProps = dispatch => {
  return {
    addPost: newPostText => {
      dispatch(addPostActionCreator(newPostText));
    }
  };
};

const MyPostContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MyPost);

export default MyPostContainer;
