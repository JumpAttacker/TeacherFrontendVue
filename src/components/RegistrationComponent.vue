<template>
  <v-card v-if="IsAuth">
    <v-card-text>
      <h3>{{ GetLogin }}, привет!</h3>
      <br/>
      Перед началом регистрации необходимо выйти.
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
      <v-form class="ml-4 mr-4" lazy-validation ref="form" v-model="valid">
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
    </v-card-text>
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
</template>

<script>
    function isBigEnough(element) {
        return element.length >= 0;
    }

    export default {
        name: "RegistrationForm",
        data: () => ({
            bottomNav: 0,
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
                this.$store.commit("SetStatus", {});
                this.$emit("update:loading", true);
                await this.$store.dispatch("Registration", registrationData);
                this.$emit("update:loading", false);
            }
        },
        mounted() {
            this.$store.dispatch("LoadSubjects");
            this.$store.commit("SetStatus", {});
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
            }
        }
    };
</script>

<style lang="scss" scoped>
  .border {
    border: 1px solid gray;
  }
</style>
