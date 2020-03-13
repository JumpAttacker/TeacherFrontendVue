<template>
  <v-card class="mr-1 mb-1 pa-0">
    <v-toolbar color="grey lighten-3" flat>
      <v-icon>mdi-account-plus</v-icon>
      <v-toolbar-title class="font-weight-light">
        Создать аккаунт
      </v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-text-field label="Почта" v-model="item.email"/>
      <v-text-field label="Имя" v-model="item.firstName"/>
      <v-text-field label="Фамилия" v-model="item.secondName"/>
      <v-text-field label="Пароль" v-model="item.password"/>
      <v-text-field label="Роль" v-model="item.role"/>
      <v-text-field label="Класс" v-model="item.classNumber"/>
      <v-menu
          :close-on-content-click="false"
          :nudge-right="40"
          min-width="290px"
          offset-y
          transition="scale-transition"
          v-model="menu"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
              label="Дата регистрации"
              readonly
              v-model="item.registrationTime"
              v-on="on"
          />
        </template>
        <v-date-picker no-title scrollable v-model="item.registrationTime">
          <v-spacer/>
          <v-btn @click="menu = false" color="primary" text>Cancel</v-btn>
          <v-btn @click="menu = false" color="primary" text>OK</v-btn>
        </v-date-picker>
      </v-menu>
      <!--      <v-text-field label="Дата регистрации" v-model="item.registrationTime" />-->
      <v-autocomplete
          :items="$store.getters.GetList"
          chips
          label="Предметы для изучения"
          multiple
          v-model="item.subjects"
      />
    </v-card-text>
    <v-divider/>
    <v-card-actions>
      <v-spacer/>
      <v-btn class="success">
        Создать
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
    function isBigEnough(element) {
        return element.length >= 0;
    }

    /**
     * @return {string}
     */
    function GetCurrentTime() {
        const today = new Date();
        return today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
    }

    export default {
        name: "RegistrationForm",
        data: () => ({
            item: {
                registrationTime: GetCurrentTime()
            },
            menu: false
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
