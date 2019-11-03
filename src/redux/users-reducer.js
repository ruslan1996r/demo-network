import { usersApi } from "../api/api";
import { updateObjectInArray } from "../utils/object-helpers";

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT";
const TOOGLE_IS_FETCHING = "TOOGLE_IS_FETCHING";
const TOOGLE_IS_FOLLOWING_PROGRESS = "TOOGLE_IS_FOLLOWING_PROGRESS";

let initialState = {
  users: [],
  pageSize: 2,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: true,
  followingInProgress: []
};

//updateObjectInArray по факту - reusable reducer
const usersReducer = (state = initialState, action) => {
  // debugger;
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, "id", {
          followed: true
        })
      };
    case UNFOLLOW:
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, "id", {
          followed: false
        })
      };
    case SET_USERS: {
      return { ...state, users: action.users };
    }
    case SET_CURRENT_PAGE: {
      return { ...state, currentPage: action.currentPage };
    }
    case SET_TOTAL_USERS_COUNT: {
      return { ...state, totalUsersCount: action.totalCount };
    }
    case TOOGLE_IS_FETCHING: {
      return { ...state, isFetching: action.isFetching };
    }
    case TOOGLE_IS_FOLLOWING_PROGRESS: {
      //Если приходит isFetching = true, то добавляет ID в массив задизейбленных
      //Когда false, то фильтрует этот же ID (убирает disabled)
      //followingInProgress содержит 1 id.
      //Если он совпадает с тем id, на который мы кликнули, то он становится disabled (уже в компоненте)
      return {
        ...state,
        followingInProgress: action.isFetching
          ? [...state.followingInProgress, action.userId]
          : state.followingInProgress.filter(id => id !== action.userId)
      };
    }

    default:
      return state;
  }
};

//actionCreators
export const followSuccess = userId => ({ type: FOLLOW, userId });
export const unfollowSuccess = userId => ({
  type: UNFOLLOW,
  userId
});
export const setUsers = users => ({ type: SET_USERS, users });
export const setCurrentPage = currentPage => ({
  type: SET_CURRENT_PAGE,
  currentPage
});
export const setTotalUsersCount = totalCount => ({
  type: SET_TOTAL_USERS_COUNT,
  totalCount
});
export const toogleIsFetching = isFetching => ({
  type: TOOGLE_IS_FETCHING,
  isFetching
});
export const toggleFollowingProgress = (isFetching, userId) => ({
  type: TOOGLE_IS_FOLLOWING_PROGRESS,
  isFetching,
  userId
});

//redux-thunk`s // thunkCreators
//функции с dispatch вызывают actionCreators для перерисовки store
//диспатчится вызов actionCreator`a, который возвращает action. Поэтому происходит dispatch обычного action
//getUsersThunkCreator - функция высшего порядка. Обёртка над младшей функцией. Её вызов вернёт thunk
export const requestUsers = (page, pageSize) => {
  return async dispatch => {
    dispatch(toogleIsFetching(true));
    dispatch(setCurrentPage(page));
    let data = await usersApi.getUsers(page, pageSize); //вместо then
    dispatch(toogleIsFetching(false));
    dispatch(setUsers(data.items));
    dispatch(setTotalUsersCount(data.totalCount));
  };
};

//reusable thunk
//как было до этого, смотри снизу
export const followUnfollowFlow = async (
  dispatch,
  userId,
  apiMethod,
  actionCreator
) => {
  dispatch(toggleFollowingProgress(true, userId));
  let response = await apiMethod(userId);
  if (response.data.resultCode === 0) {
    dispatch(actionCreator(userId));
  }
  dispatch(toggleFollowingProgress(false, userId));
};

export const follow = userId => {
  return async dispatch => {
    followUnfollowFlow(
      dispatch,
      userId,
      usersApi.follow.bind(usersApi),
      followSuccess
    ); //будет вызываться в других контекстах.Bind чтобы не потерялся
  };
};
export const unfollow = userId => {
  return async dispatch => {
    followUnfollowFlow(
      dispatch,
      userId,
      usersApi.unfollow.bind(usersApi),
      unfollowSuccess
    );
  };
};

export default usersReducer;

// export const follow = userId => {
//   return async dispatch => {
//     let apiMethod = usersApi.follow.bind(usersApi); //будет вызываться в других контекстах.Bind чтобы не потерялся
//     let actionCreator = followSuccess;
//     dispatch(toggleFollowingProgress(true, userId));
//     let response = await apiMethod;
//     if (response.data.resultCode === 0) {
//       dispatch(actionCreator(userId));
//     }
//     dispatch(toggleFollowingProgress(false, userId));
//   };
// };
