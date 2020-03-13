import axios from "axios";

export default {
  state: {
    Login: localStorage.Login || null,
    Token: localStorage.Token || null,
    Status: {
      IsError: false,
      Message: ""
    }
  },
  getters: {
    GetLogin: state => state.Login,
    GetToken: state => state.Token,
    IsAuthenticated: state => !!state.Token,
    GetStatus: state => state.Status
  },
  mutations: {
    SetLogin: (state, newLogin) => {
      state.Login = newLogin;
    },
    SetToken: (state, newToken) => {
      state.Token = newToken;
    },
    SetStatus: (state, newStatus) => {
      state.Status = newStatus;
    }
  },
  actions: {
    async Auth({commit}, {email, password}) {
      console.log(`email`, email);
      console.log(password);
      try {
        const response = await axios.get(
            `https://localhost:5001/api/Login?email=${email}&password=${password}`
        );
        const {login, token, error} = response.data;
        if (error) {
          commit("SetStatus", {Message: error, IsError: true});
          return;
        }
        console.log(response);
        commit("SetLogin", login);
        commit("SetToken", token);
        localStorage.Login = login;
        localStorage.Token = token;
        axios.defaults.headers.common.Authorization = "Bearer " + token;
      } catch (e) {
        commit("SetStatus", {Message: 'Ошибка при выполнение запроса', IsError: true});
        console.log("error -> ", e);
      }
    },
    async Registration({commit}, registrationModel) {
      try {
        const response = await axios.post(
            `https://localhost:5001/api/Registration`,
            registrationModel,
            {
              headers: {
                "content-type": "application/json"
              }
            }
        );
        const {message, error} = response.data;
        if (error) {
          // alert(error);
          commit("SetStatus", {Message: error, IsError: true});
          return;
        }
        commit("SetStatus", {Message: message, IsError: false});
        console.log(response);
      } catch (e) {
        commit("SetStatus", {
          Message: "Ошибка при выполнение запроса",
          IsError: true
        });
        console.log("error -> ", e);
      }
    },
    Logout({commit}) {
      commit("SetLogin", null);
      commit("SetToken", null);
      localStorage.removeItem("Login");
      localStorage.removeItem("Token");
    }
  }
};
