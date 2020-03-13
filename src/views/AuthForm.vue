<template>
  <div>
    <v-overlay :value="isLoading">
      <v-progress-circular color="grey lighten-5" indeterminate/>
    </v-overlay>
    <v-container>
      <v-row justify="center">
        <v-col class="mt-5" cols="12" lg="3" md="4" sm="8">
          <v-card elevation="5">
            <v-bottom-navigation dark grow shift v-model="bottomNav">
              <v-btn>
                <span>Авторизация</span>
                <v-icon>mdi-account-arrow-right</v-icon>
              </v-btn>
              <v-btn>
                <span>Регистрация</span>
                <v-icon>mdi-account-plus</v-icon>
              </v-btn>
            </v-bottom-navigation>
            <v-alert
                :type="GetAlertType"
                dismissible
                transition="scale-transition"
                v-if="ShowAlertMessage"
            >
              {{ GetAlertMessage }}
            </v-alert>
            <RegistrationComponent
                v-bind:loading.sync="isLoading"
                v-show="bottomNav"
            />
            <LoginComponent
                v-bind:loading.sync="isLoading"
                v-show="!bottomNav"
            />
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
    import RegistrationComponent from "../components/RegistrationComponent";
    import LoginComponent from "../components/LoginComponent";

    export default {
        name: "AuthForm",
        data: () => ({
            isLoading: false,
            bottomNav: null
        }),

        methods: {},
        mounted() {
        },
        components: {
            RegistrationComponent,
            LoginComponent
        },
        computed: {
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
