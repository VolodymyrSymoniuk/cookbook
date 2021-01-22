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
              <v-icon class="mr-3" v-on="on" @click.stop="createRecipe(recipe)"
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
                @click.stop="showRecipe(recipe.id)"
                :color="isRecipeActive(recipe.id) ? 'teal' : ''"
                >mdi-eye</v-icon
              >
            </template>
            <span>Look over the recipe</span>
          </v-tooltip>
        </v-list-item-icon>
      </v-list-item>

      <v-list-item @click="createRecipe(currentRootRecipe)">
        <v-list-item-content>
          <v-list-item-title>
            <v-icon class="mr-2"> mdi-plus </v-icon>add new recipe
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>
    <NewRecipeModal
      @close="toggleNewRecipeModel"
      @save="saveRecipeFromModal"
      :isShown="showModal"
    />
  </v-list>
</template>

<script>
import shortid from "shortid";
import { mapGetters, mapActions } from "vuex";
import NewRecipeModal from "@/components/NewRecipeModal";

export default {
  name: "RecipesList",
  components: { NewRecipeModal },
  computed: {
    ...mapGetters(["getChildRecipes", "currentRootRecipe", "isRecipeActive"]),
    recipes() {
      return this.getChildRecipes(this.currentRootRecipe.id);
    }
  },
  data: () => ({
    showModal: false
  }),
  methods: {
    ...mapActions(["addNewRecipe", "setActiveRecipe", "setCurrentRootRecipe"]),
    showRecipe(id) {
      this.setActiveRecipe(id);
    },
    setCurrentRoot(recipe) {
      if (recipe.childrenCount) {
        this.setCurrentRootRecipe(recipe.id);
      }
    },
    toggleNewRecipeModel() {
      this.showModal = !this.showModal;
    },
    saveRecipeFromModal(recipe) {
      this.toggleNewRecipeModel();
      this.createRecipe(recipe);
    },
    createRecipe(recipe) {
      let { title, description, ingredients, id: parent } = recipe;
      if (recipe.title.toLowerCase() === "root") {
        this.toggleNewRecipeModel();
        return;
      }

      this.addNewRecipe({
        id: shortid.generate(),
        title,
        description,
        ingredients: ingredients || [],
        createdAt: Date.now(),
        parent: parent || null,
        versions: [{ id: "default", title: "default recipe version" }]
      });
    }
  }
};
</script>
