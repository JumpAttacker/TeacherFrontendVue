<template>
  <v-app>
    <MainAppBar/>
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
// import HelloWorld from "./components/HelloWorld.vue";
import MainAppBar from "./components/MainAppBar.vue";
export default Vue.extend({
  name: "App",

  components: {
    MainAppBar
  },

  data: () => ({
    //
  })
});
</script>
