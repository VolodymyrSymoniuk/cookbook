<template>
  <v-card v-if="recipe" min-width="100%" class="mt-4 mx-auto recipe">
    <v-card-title class="headline font-weight-bold">
      <NinjaInput :key="recipe.id" v-model="title" />
    </v-card-title>

    <v-card-text class="font-weight-bold">
      <NinjaInput :key="recipe.id" v-model="description" />
      <v-row class="mr-4 mt-4" align="center" justify="end">
        Created at: {{ recipe.createdAt | date }}
      </v-row>
    </v-card-text>
  </v-card>
  <h2 class="mx-auto mt-4 px-4" v-else>
    Choose the recipe you want to work with, from the cookbook
  </h2>
</template>

<script>
import NinjaInput from "@/common/NinjaInput";
import { mapGetters } from "vuex";

export default {
  name: "Recipe",
  components: { NinjaInput },
  data: () => ({
    title: "",
    description: ""
  }),
  computed: {
    ...mapGetters({ recipe: "activeRecipe" })
  },
  watch: {
    recipe: function(recipe) {
      this.title = recipe.title;
      this.description = recipe.description;
    }
  }
};
</script>
