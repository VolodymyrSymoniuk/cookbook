<template>
  <v-app>
    <v-app-bar app color="teal" dark>
      <h1 class="letter-spacing-medium font-weight-medium">
        Cookbook
      </h1>

      <v-spacer></v-spacer>

      <v-btn @click="drawer = !drawer" text>
        <span class="mr-2">{{ drawer ? "Close" : "Open" }} recipe book</span>
        <v-icon>mdi-notebook</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <RecipesDrawer @toggle-drawer="drawer = !drawer" :drawer="drawer" />
    </v-main>
  </v-app>
</template>

<script>
import RecipesDrawer from "@/components/RecipesDrawer";

export default {
  name: "App",
  components: { RecipesDrawer },
  data: () => ({
    drawer: null
  })
};
</script>

<style lang="scss">
@import "@/assets/index.scss";
</style>
