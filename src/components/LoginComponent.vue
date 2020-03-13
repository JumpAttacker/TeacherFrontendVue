<template>
  <v-card v-if="IsAuth">
    <v-card-text>
      <h3>{{ GetLogin }}, привет!</h3>
    </v-card-text>
    <v-card-actions>
      <v-btn block color="error" tile v-on:click="$store.dispatch('Logout')">
        Выйти из системы
        <v-icon dark right>mdi-logout</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
  <v-card v-else>
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
  </v-card>
</template>

<script>
    export default {
        name: "LoginForm",
        data: function () {
            return {
                email: "",
                password: ""
            };
        },
        methods: {
            routeToRegistration: function () {
                this.$router.push("/registration");
            },
            tryToAuth: async function () {
                this.$emit("update:loading", true);
                await this.$store.dispatch("Auth", {
                    email: this.email,
                    password: this.password
                });
                this.$emit("update:loading", false);
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
                // this.$router.push("/");
            }
        }
    };
</script>

<style lang="scss" scoped>
  .click:hover {
    cursor: pointer;
  }
</style>
