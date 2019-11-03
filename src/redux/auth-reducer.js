import { authApi } from "../api/api";
import { stopSubmit } from "redux-form";

const SET_USER_DATA = "SET_USER_DATA";

let initialState = {
  userId: null,
  email: null,
  login: null,
  isAuth: false
};
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA: {
      return {
        ...state,
        ...action.payload
      };
    }
    default:
      return state;
  }
};

export const setAuthUserData = (userId, email, login, isAuth) => ({
  type: SET_USER_DATA,
  payload: { userId, email, login, isAuth }
});

//thunks
//именно в этом нужен был ретурн, чтобы возвращать промис в app-reducer
//в async await не нужны then. Await вернёт промис
export const getAuthUserData = () => async dispatch => {
  let response = await authApi.me();
  if (response.data.resultCode === 0) {
    let { id, email, login } = response.data.data;
    dispatch(setAuthUserData(id, email, login, true)); //isAuth -> true
  }
};

//здесь диспатчится thunkCreator - getAuthUserData.
//В удачном случае залогинезации происходит запрос на получение данных юзера
//вызов getAuthUserData здесь ни на что не влияет, по сути. Его вызов итак происходит в Хедере.
//Это нужно на всякий случай, если хедера не будет

//else: если сервер пришлёт !== 0, то сработает функция stopSubmit(redux-form)
export const login = (email, password, rememberMe) => async dispatch => {
  let response = await authApi.login(email, password, rememberMe);
  if (response.data.resultCode === 0) {
    dispatch(getAuthUserData());
  } else {
    let messages =
      response.data.messages.length > 0
        ? response.data.messages[0]
        : "Some error";
    dispatch(stopSubmit("login", { email: messages }));
  }
};

export const logout = () => async dispatch => {
  let response = await authApi.logout();
  if (response.data.resultCode === 0) {
    dispatch(setAuthUserData(null, null, null, false)); //isAuth -> true
  }
};

export default authReducer;

//тот response, который мы передавали в then, сейчас приходит как результат дожидания await
