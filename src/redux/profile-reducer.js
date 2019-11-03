import { usersApi, profileApi } from "../api/api";

const ADD_POST = "ADD_POST";
const SET_USERS_PROFILE = "SET_USERS_PROFILE";
const SET_STATUS = "SET_STATUS";
const DELETE_POST = "DELETE_POST";

let initialState = {
  posts: [
    { id: 1, message: "Hi, how are you?", likesCount: 12 },
    { id: 2, message: "It's my first post", likesCount: 11 },
    { id: 3, message: "Blabla", likesCount: 11 },
    { id: 4, message: "Dada", likesCount: 11 }
  ],

  profile: null,
  status: ""
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST: {
      let newPost = {
        id: Math.random(),
        message: action.newPostText,
        likesCount: 0
      };
      return {
        ...state,
        posts: [...state.posts, newPost]
      };
    }

    case SET_USERS_PROFILE: {
      return { ...state, profile: action.profile };
    }
    case SET_STATUS: {
      return { ...state, status: action.status };
    }
    case DELETE_POST: {
      return {
        ...state,
        posts: state.posts.filter(p => p.id !== action.postId)
      };
    }
    default:
      return state;
  }
};
export const addPostActionCreator = newPostText => ({
  type: ADD_POST,
  newPostText
});

export const setUserProfile = profile => ({
  //устанавливает профиль
  type: SET_USERS_PROFILE,
  profile
});

export const setStatus = status => ({
  type: SET_STATUS,
  status
});
export const deletePost = postId => ({
  type: DELETE_POST,
  postId
});

//thunks
export const getUserProfile = userId => async dispatch => {
  let response = await usersApi.getProfile(userId);
  dispatch(setUserProfile(response.data));
};

export const getStatus = userId => async dispatch => {
  let response = await profileApi.getStatus(userId);
  dispatch(setStatus(response.data));
};

export const updateStatus = status => async dispatch => {
  let response = await profileApi.updateStatus(status);
  //если пришёл удачный ответ с сервера, то перепишет редакс
  if (response.data.resultCode === 0) {
    dispatch(setStatus(status));
  }
};
export default profileReducer;
