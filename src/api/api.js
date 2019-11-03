import * as axios from "axios";
//get-параметры - http://localhost:3000/profile/status?age
//uri-параметры - http://localhost:3000/profile/status/age //должны быть в строгой последовательности

//Аналог ApiWrapper
//Что-то вроде создания дефолтных насроек для запросов. Здесь на каждом запросе будет доступ к правам, ключ и базовый url
//Далее вместо обращения axios.get(), будем обращаться instance.get()
const instance = axios.create({
  withCredentials: true,
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  headers: {
    "API-KEY": "e572a546-a926-460e-bdd5-1b2d8b0cd1cc" //ключ пользователя, что-то вроде токена
  }
});
//Создание объекта, у которого будут наследоваться методы-запросы (просто потому что)
export const usersApi = {
  getUsers(currentPage = 1, pageSize = 10) {
    return instance
      .get(`users?page=${currentPage}&count=${pageSize}`, {
        withCredentials: true
      })
      .then(response => {
        return response.data; //возвращает уже новый промис, в который закидывает ТОЛЬКО date
      });
  },
  follow(userId) {
    return instance.post(`follow/${userId}`);
  },
  unfollow(userId) {
    return instance.delete(`follow/${userId}`);
  },
  getProfile(userId) {
    console.warn("Please, use profileApi`s methods");
    return profileApi.getProfile(userId);
  }
};
//put для обновления информации
export const profileApi = {
  getProfile(userId) {
    return instance.get(`profile/${userId}`);
  },
  getStatus(userId) {
    return instance.get(`profile/status/${userId}`);
  },
  updateStatus(status) {
    return instance.put(`profile/status`, { status: status });
  }
};

export const authApi = {
  me() {
    return instance.get(`auth/me`);
  },
  login(email, password, rememberMe = false) {
    return instance.post(`auth/login`, { email, password, rememberMe });
  },
  logout() {
    return instance.delete(`auth/login`);
  }
};
