import axios from "axios";

export default {
  state: {
    List: [],
  },
  getters: {
    GetList: state => state.List,
  },
  mutations: {
    SetList: (state, List) => {
      state.List = List;
    },
  },
  actions: {
    async LoadSubjects({commit}) {
      try {
        const response = await axios.get(
            `https://localhost:5001/api/Data/GetSubjects`
        );
        console.log(response);
        commit("SetList", response.data);
      } catch (e) {
        alert("Ошибка при выполнение запроса");
        console.log("error -> ", e);
      }
    },
  }
};
