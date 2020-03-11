<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col class="mt-5" cols="12" lg="3" md="4" sm="8">
        <span v-if="IsAuth" class="display-1"
        >Добро пожаловать, {{ GetLogin }}!</span
        >
        <v-card elevation="5" v-else>
          <v-card-title class="justify-center display-1"
          >Авторизация
          </v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field
                  label="Логин"
                  name="login"
                  prepend-icon="mdi-account"
                  type="text"
                  v-model="email"
              />

              <v-text-field
                id="password"
                label="Пароль"
                name="password"
                prepend-icon="mdi-lock"
                type="password"
                v-model="password"
              />
              <span class="click font-italic font-weight-light">Забыли пароль?</span>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn block color="primary" v-on:click="tryToAuth">
              Войти
              <v-icon>
                mdi-login-variant
              </v-icon>
            </v-btn>
          </v-card-actions>
          <v-card-actions class="caption">
            <v-spacer/>
            <span class="font-italic font-weight-light">Нет аккаунта? </span>
            <span class="ml-1 click font-italic font-weight-light" v-on:click="routeToRegistration"
            >Зарегестрироваться</span
            >
            <v-spacer/>
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
        email: "",
        password: ""
    };
  },
  methods: {
    routeToRegistration: function() {
      this.$router.push("/registration");
    },
    tryToAuth: async function() {
      await this.$store.dispatch("Auth", {
          email: this.email,
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

<style lang="scss" scoped>
  .click:hover {
    cursor: pointer;
  }
</style>
