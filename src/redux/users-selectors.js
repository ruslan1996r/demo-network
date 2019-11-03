import { createSelector } from "reselect";
//selector - функция, которая принимает state и возвращает что-либо
//проверяет не изменились ли данные. Если изменились, то перерисует
//сложный селектор getUsersSuperSelector (reselect) обращается к более простому, чтобы получить НУЖНЫЕ данные
//Принимаются первым параметром, а затем передаются дальше
//Selector следит только за отдельной частью State.
//Если ничего КРОМЕ попадающих в него данных не меняется, ничего не происходит

//В чём суть? Если в приложении постоянно что-то ререндерится, чтобы не ререндерилось всё приложение, юзают reselect
//Грубо говоря, он кеширует данные (тут юзеров)

const getUsersSelector = state => {
  return state.usersPage.users; //примитивный селектор
};
export const getIsFetching = state => {
  return state.usersPage.isFetching;
};

export const getUsers = createSelector(
  getUsersSelector,
  getIsFetching,
  (users, isFetching) => users.filter(u => true) //сложный селектор
);

export const getPageSize = state => {
  return state.usersPage.pageSize;
};
export const getTotalUsersCount = state => {
  return state.usersPage.totalUsersCount;
};
export const getCurrentPage = state => {
  return state.usersPage.currentPage;
};

export const getFollowingInProgress = state => {
  return state.usersPage.followingInProgress;
};

// users, pageSize, totalUsersCount, currentPage, isFetching, followingInProgress;
