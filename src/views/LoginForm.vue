<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col class="mt-5" cols="12" md="4" sm="8">
        <span v-if="IsAuth" class="display-1"
          >Добро пожаловать, {{ GetLogin }}!</span
        >
        <v-card elevation="5" v-else>
          <v-card-title>Авторизация</v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field
                label="Логин"
                name="login"
                prepend-icon="mdi-account"
                type="text"
                v-model="login"
              />

              <v-text-field
                id="password"
                label="Пароль"
                name="password"
                prepend-icon="mdi-lock"
                type="password"
                v-model="password"
              />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" v-on:click="routeToRegistration">
              Регистрация
            </v-btn>
            <v-spacer />
            <v-btn color="primary" v-on:click="tryToAuth">
              Войти
              <v-icon>
                mdi-login-variant
              </v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "LoginForm",
  data: function() {
    return {
      login: "",
      password: ""
    };
  },
  methods: {
    routeToRegistration: function() {
      this.$router.push("/registration");
    },
    tryToAuth: async function() {
      await this.$store.dispatch("Auth", {
        login: this.login,
        password: this.password
      });
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
  },
  mounted() {
    if (this.IsAuth) {
      this.$router.push("/");
    }
  }
};
</script>

<style lang="scss" scoped></style>
