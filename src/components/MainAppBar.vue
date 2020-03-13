<template>
  <v-app-bar app color="primary" dark>
    <span class="display-1 HomeButton" v-on:click="toHome">Навигация</span>
    <span>
      <router-link class="link title" :to="{ name: 'Login' }">
        Логин
      </router-link>
    </span>
    <span>
      <router-link class="link title" :to="{ name: 'Registration' }">
        Регистрация
      </router-link>
    </span>
    <span>
      <router-link :to="{ name: 'Shop' }" class="link title">
        Каталог
      </router-link>
    </span>
    <span>
      <router-link :to="{ name: 'AuthForm' }" class="link title">
        Форма авторизации
      </router-link>
    </span>
    <span>
      <router-link :to="{ name: 'AdminPanel' }" class="link title">
        AdminPanel
      </router-link>
    </span>
    <v-spacer/>
    <span>{{ GetLogin }}</span>
    <v-btn icon :disabled="!IsAuth" v-on:click="Logout()">
      <v-icon>mdi-logout-variant</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
    name: "MainAppBar",
    methods: {
        toHome: function () {
            const path = "/";
            if (this.$route.path !== path) this.$router.push(path);
        },
        Logout: function () {
            this.$store.dispatch("Logout");
        }
    },
    computed: {
        /**
         * @return {boolean}
         */
        IsAuth() {
            return this.GetLogin !== null;
        },
        GetLogin() {
            return this.$store.getters.GetLogin;
        }
    }
};
</script>

<style lang="scss" scoped>
.link {
  color: white;
  padding: 5px;
  margin: 5px;
}
.HomeButton:hover {
  cursor: pointer;
}
</style>
