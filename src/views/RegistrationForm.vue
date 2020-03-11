<template>
  <div>
    <v-container v-if="IsAuth">
      <v-row align="center" justify="center">
        <span class="display-1">
          Перед началом регистрации необходимо выйти
        </span>
      </v-row>
      <v-row align="center" justify="center" class="mt-5">
        <v-btn color="error" v-on:click="Logout">
          Выйти
          <v-icon>mdi-logout</v-icon>
        </v-btn>
      </v-row>
    </v-container>
    <v-container v-else>
      <v-row justify="center">
        <v-col class="mt-5" cols="12" lg="3" md="4" sm="8">
          <v-card elevation="5">
            <v-card-title class="justify-center display-1">
              Регистрация
            </v-card-title>
            <v-form class="ma-4" lazy-validation ref="form" v-model="valid">
              <!--              <v-text-field-->
              <!--                v-model="login"-->
              <!--                :counter="25"-->
              <!--                :rules="nameRules"-->
              <!--                label="Логин"-->
              <!--                required-->
              <!--              />-->
              <v-text-field
                  :rules="fioRules"
                  label="Имя"
                  required
                  v-model="firstName"
              />
              <v-text-field
                  :rules="fioRules"
                  label="Фамилия"
                  required
                  v-model="secondName"
              />
              <v-text-field
                  :rules="emailRules"
                  label="E-mail"
                  required
                  v-model="email"
              />
              <v-select
                  :items="items"
                  :rules="[v => v.length > 0 || 'Необходимо выбрать предметы']"
                  label="Предметы"
                  multiple
                  required
                  v-model="selectedItems"
              />
              <v-select
                  :items="[5, 6, 7, 8, 9, 10, 11]"
                  :rules="[v => !!v || 'Необходимо выбрать класс']"
                  label="Класс"
                  required
                  v-model="select"
              />
              <v-checkbox
                  :rules="[v => !!v || 'You must agree to continue!']"
                  label="Do you agree?"
                  required
                  v-model="checkbox"
              />
            </v-form>
            <v-card-actions>
              <v-btn :disabled="!valid || !checkbox" block color="primary">Зарегестрироваться</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "RegistrationForm",
  data: () => ({
      valid: false,
      login: "",
      firstName: "",
      secondName: "",
      selectedItems: [],
      nameRules: [
          v => !!v || "Name is required",
          v => (v && v.length <= 25) || "Name must be less than 25 characters"
      ],
      fioRules: [v => !!v || "Поле обязательное"],
      email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+\..+/.test(v) || "E-mail must be valid"
    ],
    select: null,
    items: ["Физика", "Математика", "Информатика"],
    checkbox: false
  }),

  methods: {
    validate() {
      const validate = this.$refs.form.validate();
      console.log(validate);
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    Logout: function() {
      this.$store.dispatch("Logout");
    }
  },
  components: {},
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
  .border {
    border: 1px solid gray;
  }
</style>
