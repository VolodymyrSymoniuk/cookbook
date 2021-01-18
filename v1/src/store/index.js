import Vue from "vue";
import Vuex from "vuex";
import externalRecipes from "./recipes.mock";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    recipes: [],
    currentRecipe: null
  },
  mutations: {
    setRecipes(state, recipes) {
      state.recipes = recipes;
    },
    makeRecipeParent(state, { id }) {
      const recipe = state.recipes.find(r => id === r.id);
      recipe.children = [];
    },
    updateRecipeWithDescription(state, { id, description }) {
      const recipe = state.recipes.find(r => id === r.id);
      recipe.versions.push(recipe.description);
      recipe.description = description;
    },
    addNewRecipe(state, recipe) {
      state.recipes.push(recipe);
    },
    setActiveRecipeById(state, id) {
      state.currentRecipe = state.recipes.find(r => r.id === id);
    }
  },
  actions: {
    fetchRecipes({ commit }) {
      const recipes = externalRecipes;
      commit("setRecipes", recipes);
    },
    addNewRecipe({ commit }, recipe) {
      commit("addNewRecipe", recipe);
      commit("setActiveRecipeById", recipe.id);
    }
  },
  getters: {
    getRecipeById: ({ recipes }) => id => {
      const item = recipes.find(r => r.id === id);
      const childrenIds = recipes
        .filter(r => r.parent === item.id)
        .sort((a, b) => a.description.localeCompare(b.description))
        .map(({ id }) => id);
      return {
        ...item,
        children: childrenIds
      };
    },
    rootRecipeId: ({ recipes }) => recipes.find(r => !r.parent)?.id,
    isRecipeActive: ({ currentRecipe }) => id => currentRecipe?.id === id,
    currentRecipe: s => s.currentRecipe
  }
});
