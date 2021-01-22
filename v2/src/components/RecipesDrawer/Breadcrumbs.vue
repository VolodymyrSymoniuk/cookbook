<template>
  <v-breadcrumbs :items="recipesHirerarchy">
    <template v-slot:item="{ item }">
      <v-breadcrumbs-item class="pointer" @click="setCurrentRoot(item)">
        {{ item.title }}
      </v-breadcrumbs-item>
    </template>
    <template v-slot:divider>
      <v-icon>mdi-chevron-right</v-icon>
    </template>
  </v-breadcrumbs>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "RecipesBreadcrumbs",
  computed: {
    ...mapGetters(["currentRootRecipe", "recipeParentsHierarchy"]),
    recipesHirerarchy() {
      return this.recipeParentsHierarchy(this.currentRootRecipe);
    }
  },
  methods: {
    ...mapActions(["setCurrentRootRecipe"]),
    setCurrentRoot(recipe) {
      this.setCurrentRootRecipe(recipe.id);
    }
  }
};
</script>
