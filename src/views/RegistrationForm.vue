<template>
  <v-card>
    <v-card-title>
      <span class="headline">User Profile</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12" sm="6" md="4">
            <v-text-field label="Имя*" required></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field
              label="Фамилия*"
              hint="example of helper text only on focus"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field
              label="Отчество"
              hint="example of persistent helper text"
              persistent-hint
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field label="Почта*" required></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              label="Пароль*"
              type="password"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-select
              :items="['5', '6', '7', '8', '9', '10', '11']"
              label="Класс*"
              required
            ></v-select>
          </v-col>
          <v-col cols="12" sm="6">
            <v-autocomplete
              :items="['Математика', 'Физика', 'Информатика']"
              label="Предмет*"
              multiple
            ></v-autocomplete>
          </v-col>
        </v-row>
      </v-container>
      <small>поля со * необходимо заполнить</small>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
      <v-btn color="blue darken-1" text @click="dialog = false">Save</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "RegistrationForm",
  data: () => ({}),
  methods: {},
  components: {}
};
</script>

<style scoped></style>
