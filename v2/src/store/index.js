import Vue from "vue";
import Vuex from "vuex";
import { deepEqual } from "../../utils/deepEqual";
import { defaultRecipeRoot, recipes } from "./recipes.mock";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    recipes,
    currentRootRecipe: defaultRecipeRoot,
    displayRecipe: null
  },
  mutations: {
    setRecipes(state, recipes) {
      state.recipes = recipes;
    },
    setCurrentRootRecipeById(state, id) {
      state.currentRootRecipe =
        state.recipes.find(r => r.id === id) || defaultRecipeRoot;
    },
    // makeRecipeParent(state, { id }) {
    //   const recipe = state.recipes.find(r => id === r.id);
    //   recipe.children = [];
    // },
    // updateRecipeWithDescription(state, { id, description }) {
    //   const recipe = state.recipes.find(r => id === r.id);
    //   recipe.versions.push(recipe.description);
    //   recipe.description = description;
    // },
    addNewRecipe(state, recipe) {
      state.recipes.push(recipe);
    },
    setActiveRecipeById(state, id) {
      state.displayRecipe = state.recipes.find(r => r.id === id);
    }
  },
  actions: {
    addNewRecipe({ commit }, recipe) {
      commit("addNewRecipe", recipe);
      commit("setActiveRecipeById", recipe.id);
    }
  },
  getters: {
    // currentRecipe: s => s.currentRecipe,
    getChildRecipes: ({ recipes }) => id => {
      return recipes
        .filter(r => r.parent === id)
        .sort((a, b) => a.title.localeCompare(b.title))
        .map(r => {
          const children = recipes.filter(({ parent }) => parent === r.id);
          return { ...r, childrenCount: children.length };
        });
    },
    recipeParentsHierarchy: ({ recipes }) => currRecipe => {
      if (deepEqual(defaultRecipeRoot, currRecipe)) return [defaultRecipeRoot];

      let recipe = currRecipe;
      const hierarchy = [{ id: recipe.id, title: recipe.title }];
      while (recipe.parent) {
        recipe = recipes.find(r => r.id === recipe.parent);
        hierarchy.unshift({ id: recipe.id, title: recipe.title });
      }
      return [defaultRecipeRoot, ...hierarchy];
    },
    getRecipeById: ({ recipes }) => id => {
      return recipes.find(r => r.id === id);
    },
    isRecipeActive: ({ displayRecipe }) => id => displayRecipe?.id === id,
    currentRootRecipe: s => s.currentRootRecipe
  }
});
