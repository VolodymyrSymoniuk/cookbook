<template>
  <v-card v-if="recipe" min-width="100%" class="my-4 mx-auto recipe">
    <v-card-title class="headline font-weight-bold">
      <NinjaInput :key="recipe.id + version.id" v-model.trim="title" />
    </v-card-title>

    <v-card-text class="font-weight-bold">
      <NinjaInput :key="recipe.id + version.id" v-model.trim="description" />
      <v-row class="mt-4">
        <v-col cols="12" sm="6">
          <IngredientsList
            :ingredients="ingredients"
            @add="addIngredient"
            @remove="removeIngredient"
          />
        </v-col>

        <v-col cols="12" sm="6">
          <v-select
            :key="activeRecipe.versions.length"
            color="teal"
            v-model="version"
            :items="versions"
            item-text="title"
            item-value="id"
            label="Select recipe version"
            return-object
            single-line
          ></v-select>
          <v-btn
            block
            color="white-text teal lighten-1"
            elevation="2"
            @click="updateRecipeData"
          >
            Update recipe
          </v-btn>
          <v-btn
            block
            color="white-text teal lighten-1"
            class="mt-4"
            elevation="2"
            @click="createNewVersion"
          >
            Save as a new version
          </v-btn>
        </v-col>
      </v-row>

      <v-row class="mr-4 mt-4" align="center" justify="end">
        Created at: {{ recipe.createdAt | date }}
      </v-row>
    </v-card-text>
    <Snackbar />
  </v-card>
  <h2 class="mx-auto mt-4 px-4" v-else>
    Choose the recipe you want to work with, from the cookbook
  </h2>
</template>

<script>
import shortid from "shortid";
import { mapGetters, mapActions } from "vuex";
import NinjaInput from "@/common/NinjaInput";
import IngredientsList from "./IngredientsList";
import Snackbar from "@/common/Snackbar";

export default {
  name: "Recipe",
  components: { NinjaInput, IngredientsList, Snackbar },
  data: () => ({
    recipe: null,
    title: "",
    description: "",
    ingredients: [],
    versions: [],
    version: null
  }),
  computed: {
    ...mapGetters(["activeRecipe"])
  },
  watch: {
    activeRecipe: function(activeRecipe) {
      this.recipe = activeRecipe;
      this.versions = [...activeRecipe.versions];
      this.version = activeRecipe.versions[0];
    },
    recipe: function(recipe) {
      this.title = recipe.title;
      this.description = recipe.description;
      this.ingredients = [...recipe.ingredients];
    },
    version: function(version) {
      if (version.id === "default") {
        this.recipe = this.activeRecipe;
      } else {
        // eslint-disable-next-line no-unused-vars
        const { id, ...versionWithoutId } = version;
        this.recipe = { ...this.recipe, ...versionWithoutId };
      }
    }
  },
  methods: {
    ...mapActions({
      showSnack: "snackbar/showSnack",
      updateRecipe: "updateRecipe",
      updateRecipeVersion: "updateRecipeVersion",
      addActiveRecipeVersion: "addActiveRecipeVersion"
    }),
    showNotification(message) {
      this.showSnack({
        text: message,
        color: "success",
        timeout: 2000
      });
    },
    addIngredient(ingredient) {
      this.ingredients.push(ingredient);
    },
    removeIngredient(id) {
      this.ingredients = this.ingredients.filter(i => i.id !== id);
    },
    updateRecipeData() {
      const data = {
        title: this.title,
        description: this.description,
        ingredients: this.ingredients
      };

      if (this.version.id === "default") {
        this.updateRecipe({ data, id: this.recipe.id });
        this.showNotification("Recipe was successfully updated");
      } else {
        this.updateRecipeVersion({
          data,
          recipeId: this.recipe.id,
          versionId: this.version.id
        });
        this.showNotification("Recipe version was successfully updated");
      }
    },
    createNewVersion() {
      const newVersion = {
        id: shortid.generate(),
        title: this.title,
        description: this.description,
        ingredients: this.ingredients,
        createdAt: Date.now()
      };

      this.showNotification("New version was successfully added");

      this.addActiveRecipeVersion(newVersion);
      this.versions.push(newVersion);
      this.version = newVersion;
    }
  }
};
</script>
