<template>
  <div>
    <v-overlay :value="isLoading">
      <v-progress-circular color="grey lighten-5" indeterminate/>
    </v-overlay>

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
            <v-alert
                :type="GetAlertType"
                dismissible
                transition="scale-transition"
                v-if="ShowAlertMessage"
            >
              {{ GetAlertMessage }}
            </v-alert>
            <v-card-title class="justify-center display-1">
              Регистрация
            </v-card-title>
            <v-form class="ma-4" lazy-validation ref="form" v-model="valid">
              <v-text-field
                  :counter="25"
                  :rules="fioRules"
                  label="Имя"
                  required
                  v-model="firstName"
              />
              <v-text-field
                  :counter="25"
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
              <v-text-field
                  :type="'password'"
                  label="Пароль"
                  required
                  v-model="password"
              />
              <v-text-field
                  :rules="[v => password === v || 'Пароли должны совпадать']"
                  :type="'password'"
                  label="Подтвердить пароль"
                  required
                  v-model="password2"
              />
              <v-select
                  :items="$store.getters.GetList"
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
                  v-model="classNumber"
              />
              <v-checkbox
                  :rules="[v => !!v || 'You must agree to continue!']"
                  label="Do you agree?"
                  required
                  v-model="checkbox"
              />
            </v-form>
            <v-card-actions>
              <v-btn
                  :disabled="!valid || !checkbox || !IsNotEmpty"
                  block
                  color="primary"
                  v-on:click="Registration"
              >
                Зарегестрироваться
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
    function isBigEnough(element) {
        return element.length >= 0;
    }
export default {
  name: "RegistrationForm",
  data: () => ({
      valid: false,
      login: "",
      password: "",
      password2: "",
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
          v =>
              /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/.test(
                  v
              ) || "E-mail must be valid"
      ],
      classNumber: null,
      items: ["Физика", "Математика", "Информатика"],
      checkbox: false,
      isLoading: false
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
      /**
       * @return {boolean}
       */
      IsStrNotEmpty(arrayOfStr) {
          return arrayOfStr.every(isBigEnough);
      },
      Logout: function () {
          this.$store.dispatch("Logout");
      },
      async Registration() {
          let registrationData = {
              email: this.email,
              firstName: this.firstName,
              secondName: this.secondName,
              password: this.password,
              classNumber: this.classNumber,
              wantToLearn: this.selectedItems
          };
          this.$store.commit("SetRegStatus", {});
          this.isLoading = true;
          await this.$store.dispatch("Registration", registrationData);
          this.isLoading = false;
          if (this.$store.getters.GetRegStatus.ErrorMessage) {
          } else {
              // await this.$router.push("/");
          }
      }
  },
    mounted() {
        this.$store.dispatch("LoadSubjects");
        this.$store.commit("SetRegStatus", {});
    },
    components: {},
    computed: {
        /**
         * @return {boolean}
         */
        IsAuth() {
            return this.GetLogin !== null;
        },
        /**
         * @return {string}
         */
        GetLogin() {
            return this.$store.getters.GetLogin;
        },

        /**
         * @return {boolean}
         */
        IsNotEmpty() {
            return (
                this.IsStrNotEmpty([
                    this.email,
                    this.firstName,
                    this.secondName,
                    this.password,
                    this.password
                ]) && this.classNumber
            );
        },
        /**
         * @return {boolean}
         */
        ShowAlertMessage() {
            return this.$store.getters.GetStatus.Message;
        },
        /**
         * @return {string}
         */
        GetAlertMessage() {
            return this.$store.getters.GetStatus.Message;
        },
        /**
         * @return {string}
         */
        GetAlertType() {
            return this.$store.getters.GetStatus.IsError ? "error" : "success";
        }
    }
};
</script>

<style lang="scss" scoped>
  .border {
    border: 1px solid gray;
  }
</style>
