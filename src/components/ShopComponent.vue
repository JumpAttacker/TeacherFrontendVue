<template>
  <v-hover v-slot:default="{ hover }">
    <v-card class="mx-auto" color="grey lighten-4" max-width="600">
      <v-img :aspect-ratio="1" :src="item.img">
        <v-expand-transition>
          <div
              class="d-flex transition-fast-in-fast-out orange darken-2  v-card--reveal display-3 white--text"
              style="height: 100%;"
              v-if="hover"
          >
            $14.99
          </div>
        </v-expand-transition>
      </v-img>
      <v-card-text class="pt-6" style="position: relative;">
        <v-btn absolute class="white--text" color="orange" fab large right top>
          <v-icon>mdi-cart</v-icon>
        </v-btn>
        <div class="font-weight-light grey--text title mb-2">
          For the perfect meal
        </div>
        <h3 class="display-1 font-weight-light orange--text mb-2">
          {{ item.name }}
        </h3>
        <div class="font-weight-light title mb-2">
          Our Vintage kitchen utensils delight any chef.<br/>
          Made of bamboo by hand
        </div>
      </v-card-text>
    </v-card>
  </v-hover>
</template>

<script>
    export default {
        name: "ShopComponent",
        props: {
            item: {
                name: "",
                img: ""
            }
        }
    };
</script>

<style scoped>
  .v-card--reveal {
    align-items: center;
    bottom: 0;
    justify-content: center;
    opacity: 0.5;
    position: absolute;
    width: 100%;
  }
</style>
