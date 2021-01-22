<template>
  <v-app>
    <v-app-bar app color="teal" dark>
      <h1 class="letter-spacing-medium font-weight-medium">
        Cookbook
      </h1>

      <v-spacer></v-spacer>

      <v-btn :key="drawer" @click="drawer = !drawer" text>
        <span class="mr-2">{{ drawer ? "Close" : "Open" }} recipe book</span>
        <v-icon>mdi-notebook</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <RecipesDrawer :drawer="drawer" @set-drawer="setDrawer" />

      <v-container class="recipe-container overflow-y-auto">
        <v-row>
          <Recipe />
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Recipe from "@/components/Recipe";
import RecipesDrawer from "@/components/RecipesDrawer";

export default {
  name: "App",
  components: { Recipe, RecipesDrawer },
  data: () => ({
    drawer: false
  }),
  methods: {
    setDrawer(drawer) {
      this.drawer = drawer;
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/index.scss";
</style>
