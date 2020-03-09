<template>
  <v-app-bar app color="primary" dark>
    <span class="display-1 HomeButton" v-on:click="toHome">Навигация</span>
    <span>
      <router-link class="link title" :to="{ name: 'Login' }">
        Авторизация
      </router-link>
    </span>
    <span>
      <router-link class="link title" :to="{ name: 'Registration' }">
        Регистрация
      </router-link>
    </span>
    <v-spacer></v-spacer>

    <v-btn
      href="https://github.com/vuetifyjs/vuetify/releases/latest"
      target="_blank"
      text
    >
      <span class="mr-2">Latest Release</span>
      <v-icon>mdi-open-in-new</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: "MainAppBar",
  methods: {
    toHome: function() {
      const path = "/";
      if (this.$route.path !== path) this.$router.push(path);
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
