<template>
  <v-tabs centered fixed-tabs>
    <v-tab>Users</v-tab>
    <v-tab>Tab2</v-tab>
    <v-tab-item>
      <v-container fluid>
        <v-row>
          <v-col
              :key="i"
              class="d-flex child-flex"
              cols="3"
              v-for="(item, i) in users"
          >
            <UserItemComponent :item="item"/>
          </v-col>
          <v-col cols="3">
            <CreateUserComponent/>
          </v-col>
        </v-row>
      </v-container>
    </v-tab-item>
    <v-tab-item>
      item2
    </v-tab-item>
  </v-tabs>
</template>

<script>
    import axios from "axios";
    import UserItemComponent from "../components/AdminPanel/UserItemComponent";
    import CreateUserComponent from "../components/AdminPanel/CreateUserComponent";

    export default {
        name: "AdminPanel",
        data() {
            return {
                users: [
                    {
                        email: "",
                        password: "",
                        role: "",
                        classNumber: "",
                        firstName: "",
                        secondName: "",
                        registrationTime: "",
                        subjects: []
                    }
                ]
            };
        },
        async mounted() {
            const response = await axios.get(
                `https://localhost:5001/api/Data/GetAllUsers`
            );
            console.log(response.data.list);
            this.users = response.data.list;
            await this.$store.dispatch("LoadSubjects");
        },
        components: {
            UserItemComponent,
            CreateUserComponent
        }
    };
</script>

<style scoped></style>
