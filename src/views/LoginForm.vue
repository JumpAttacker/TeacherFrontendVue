<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col align="center" class="mt-5" cols="12" md="4" sm="8">
        <v-card elevation="5">
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
function GetUserWelcome(token) {
  const myHeaders = new Headers();
    console.log(`token:`,token)
  myHeaders.append("Authorization", "Bearer " + token);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    redirect: "follow"
  };

  fetch("https://localhost:5001/api/Login/Post", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log("error", error));
}

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
      const myHeaders = new Headers();
      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
      };
      try {
        console.log(`trying to to some shit`, this.login, this.password);
        const response = await fetch(
          `https://localhost:5001/api/Login?name=${this.login}&password=${this.password}`,
          requestOptions
        );
        const result = await response.json();
        console.log(result.token);
        GetUserWelcome(result.token);
      } catch (e) {
        console.error(e);
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
