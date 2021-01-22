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
      <v-navigation-drawer v-model="drawer" absolute temporary right>
        <template v-slot:prepend>
          <Breadcrumbs />
          <v-divider></v-divider>
          <List />
        </template>
      </v-navigation-drawer>

      <v-container>
        <v-row>
          <Recipe />
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Breadcrumbs from "@/components/Recipes/Breadcrumbs";
import List from "@/components/Recipes/List";
import Recipe from "@/components/Recipe";

export default {
  name: "App",
  components: { Breadcrumbs, List, Recipe },
  data: () => ({
    drawer: false
  })
};
</script>

<style lang="scss">
@import "@/assets/index.scss";
</style>
