<template>
  <v-app>
    <MainAppBar />
    <v-content fluid>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
    import Vue from "vue";
    import MainAppBar from "./components/MainAppBar.vue";
    import axios from "axios";

    export default Vue.extend({
        login: "App",

        components: {
            MainAppBar
        },
        methods: {
            // ClickFunction() {
            //   axios.post("https://localhost:5001/api/Login/Post");
            // }
        },
        mounted() {
            if (this.$store.getters.IsAuthenticated) {
                axios.defaults.headers.common.Authorization =
                    "Bearer " + this.$store.getters.GetToken;
            }
        },

        data: () => ({
            //
        }),
        created: function () {
            const dat = this;
            axios.interceptors.response.use(undefined, function (err) {
                return new Promise(function (resolve, reject) {
                    //dat.$store.dispatch("Logout");
                    if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
                        // if you ever get an unauthorized, logout the user
                        this.$store.dispatch("Logout");
                        // you can also redirect to /login if needed !
                    }
                    throw err;
                });
            });
        }
    });
</script>
