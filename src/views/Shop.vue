<template>
  <v-container>
    <v-row align="center" justify="center">
      <template v-for="(item, i) in items">
        <ShopComponent :item="item" :key="i"/>
      </template>
    </v-row>
  </v-container>
</template>
<script>
    import ShopComponent from "../components/ShopComponent";

    export default {
        name: "Shop",
        data: () => ({
            items: [
                {
                    name: "Физика",
                    img:
                        "https://ic.pics.livejournal.com/romix1c/12777694/51728/51728_original.png"
                },
                {
                    name: "Математика",
                    img: "https://uroki.tv/foto/obl/Matematika-6-klass-Vilenkin.png"
                },
                {
                    name: "Информатика",
                    img:
                        "https://rabochaya-tetrad-uchebnik.com/informatika/informatika_uchebnik_7_klass_bosova/1.jpg"
                }
            ]
        }),
        components: {
            ShopComponent
        }
    };
</script>

<style scoped/>
