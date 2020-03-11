import axios from "axios";

export default {
  state: {
    Login: localStorage.Login || null,
    Token: localStorage.Token || null,
    Status: null
  },
  getters: {
    GetLogin: state => state.Login,
    GetToken: state => state.Token,
    IsAuthenticated: state => !!state.Token,
    GetAuthStatus: state => state.Status
  },
  mutations: {
    SetLogin: (state, newLogin) => {
      state.Login = newLogin;
    },
    SetToken: (state, newToken) => {
      state.Token = newToken;
    }
  },
  actions: {
    async Auth({ commit }, { loginOrEmail, password }) {
      try {
        const response = await axios.get(
          `https://localhost:5001/api/Login?login=${loginOrEmail}&password=${password}`
        );
        const { login, token, error } = response.data;
        if (error) {
          alert(error);
          return;
        }
        console.log(response);
        commit("SetLogin", login);
        commit("SetToken", token);
        localStorage.Login = login;
        localStorage.Token = token;
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      } catch (e) {
        alert("Ошибка при выполнение запроса");
        console.log("error -> ", e);
      }
    },
    Logout({ commit }) {
      commit("SetLogin", null);
      commit("SetToken", null);
      localStorage.removeItem("Login");
      localStorage.removeItem("Token");
    }
  }
};
