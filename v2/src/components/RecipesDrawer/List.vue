<template>
  <v-list dense>
    <v-list-item-group>
      <v-list-item
        v-for="(recipe, i) of recipes"
        :key="i"
        @click="setCurrentRoot(recipe)"
      >
        <v-list-item-content>
          <v-list-item-title>{{ recipe.title }}</v-list-item-title>
        </v-list-item-content>
        <v-list-item-icon>
          <v-tooltip top v-if="recipe.childrenCount">
            <template #activator="{ on }">
              <v-badge
                left
                bottom
                bordered
                overlap
                color="teal"
                :content="recipe.childrenCount"
              >
                <v-icon class="mr-3" v-on="on">mdi-chevron-down</v-icon>
              </v-badge>
            </template>
            <span>Look over the recipe children</span>
          </v-tooltip>

          <v-tooltip
            top
            v-if="!recipe.childrenCount"
            :key="recipe.childrenCount"
          >
            <template #activator="{ on }">
              <v-icon class="mr-3" v-on="on" @click.stop="createChildOf(recipe)"
                >mdi-source-branch</v-icon
              >
            </template>
            <span>Create the recipe child branch</span>
          </v-tooltip>

          <v-tooltip top>
            <template #activator="{ on }">
              <v-icon
                class="mr-3"
                v-on="on"
                @click.stop="setActiveRecipe(recipe.id)"
                :color="isRecipeActive(recipe.id) ? 'teal' : ''"
                >mdi-eye</v-icon
              >
            </template>
            <span>Look over the recipe</span>
          </v-tooltip>
        </v-list-item-icon>
      </v-list-item>

      <v-list-item @click="createChildOf(currentRootRecipe)">
        <v-list-item-content>
          <v-list-item-title>
            <v-icon class="mr-2"> mdi-plus </v-icon>add new recipe
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>

<script>
import shortid from "shortid";
import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  name: "RecipesList",
  computed: {
    ...mapGetters(["getChildRecipes", "currentRootRecipe", "isRecipeActive"]),
    recipes() {
      return this.getChildRecipes(this.currentRootRecipe.id);
    }
  },
  methods: {
    ...mapMutations(["setActiveRecipeById", "setCurrentRootRecipeById"]),
    ...mapActions(["addNewRecipe"]),
    setActiveRecipe(id) {
      this.setActiveRecipeById(id);
    },
    setCurrentRoot(recipe) {
      if (recipe.childrenCount) {
        this.setCurrentRootRecipeById(recipe.id);
      }
    },
    async createChildOf(recipe) {
      let { title, description, ingredients, id: parent } = recipe;
      if (recipe.title.toLowerCase() === "root") {
        try {
          title = await this.$prompt("Enter title of new recipe:");
          description = await this.$prompt("Enter description of new recipe:");
        } catch (_) {
          this.$alert("Invalid recipe data entered!");
          return;
        }
      }

      this.addNewRecipe({
        id: shortid.generate(),
        title,
        description,
        ingredients: ingredients || [],
        createdAt: Date.now(),
        parent,
        versions: []
      });
    }
  }
};
</script>
