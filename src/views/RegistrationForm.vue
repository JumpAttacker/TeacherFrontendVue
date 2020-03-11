<template>
  <div>
    <v-container v-if="IsAuth">
      <v-row align="center" justify="center">
        <span class="display-1"
          >Перед началом регистрации необходимо выйти</span
        >
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
        <span class="display-1">Регистрация</span>
      </v-row>
      <v-row justify="center">
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="login"
            :counter="25"
            :rules="nameRules"
            label="Логин"
            required
          />
          <v-text-field
            v-model="firstName"
            :rules="fioRules"
            label="Имя"
            required
          />
          <v-text-field
            v-model="secondName"
            :rules="fioRules"
            label="Фамилия"
            required
          />
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
          />

          <v-select
            v-model="selectedItems"
            :items="items"
            :rules="[v => v.length > 0 || 'Необходимо выбрать предметы']"
            label="Предметы"
            required
            multiple
          />
          <v-select
            v-model="select"
            :items="[5, 6, 7, 8, 9, 10, 11]"
            :rules="[v => !!v || 'Необходимо выбрать класс']"
            label="Класс"
            required
          />

          <v-checkbox
            v-model="checkbox"
            :rules="[v => !!v || 'You must agree to continue!']"
            label="Do you agree?"
            required
          />

          <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="validate"
          >
            Validate
          </v-btn>

          <v-btn color="error" class="mr-4" @click="reset">
            Reset Form
          </v-btn>

          <v-btn color="warning" @click="resetValidation">
            Reset Validation
          </v-btn>
        </v-form>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "RegistrationForm",
  data: () => ({
    valid: true,
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

<style scoped></style>
