import Vue from "vue";
import Vuex from "vuex";
import { isEqual } from "lodash";
import { defaultRecipeRoot, recipes } from "./recipes.mock";
import snackbar from "./snackbar";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    recipes,
    currentRootRecipe: defaultRecipeRoot,
    activeRecipe: null
  },
  mutations: {
    setRecipes(state, recipes) {
      state.recipes = recipes;
    },
    setCurrentRootRecipe(state, recipe) {
      state.currentRootRecipe = recipe;
    },
    addNewRecipe(state, recipe) {
      state.recipes.push(recipe);
    },
    setActiveRecipe(state, recipe) {
      state.activeRecipe = recipe;
    },
    updateRecipeOrVersion(_, { item, data }) {
      Object.entries(data).forEach(([key, value]) => {
        if (!isEqual(item[key], value)) item[key] = value;
      });
    },
    updateActiveRecipeWithVersion(state, version) {
      state.activeRecipe.versions.push(version);
    }
  },
  actions: {
    updateRecipeVersion({ getters, commit }, { recipeId, versionId, data }) {
      const version = getters.getRecipeVersionById(recipeId, versionId);
      commit("updateRecipeOrVersion", { item: version, data });
    },
    updateRecipe({ getters, commit }, { id, data }) {
      const recipe = getters.getRecipeById(id);
      commit("updateRecipeOrVersion", { item: recipe, data });
    },
    setActiveRecipe({ getters, commit }, id) {
      const recipe = getters.getRecipeById(id);
      commit("setActiveRecipe", recipe);
    },
    setCurrentRootRecipe({ getters, commit }, id) {
      const recipe = getters.getRecipeById(id) || defaultRecipeRoot;
      commit("setCurrentRootRecipe", recipe);
    },
    addNewRecipe({ commit }, recipe) {
      commit("addNewRecipe", recipe);
      commit("setActiveRecipe", recipe);
    },
    addActiveRecipeVersion({ commit, getters }, version) {
      const activeRecipe = getters.activeRecipe;
      Object.entries(version).forEach(([key, value]) => {
        if (isEqual(activeRecipe[key], value) && key !== "title") {
          delete version[key];
        }
      });
      commit("updateActiveRecipeWithVersion", version);
    }
  },
  getters: {
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
      if (isEqual(defaultRecipeRoot, currRecipe)) return [defaultRecipeRoot];

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
    getRecipeVersionById: ({ recipes }) => (recipeId, versionId) => {
      const currRecipe = recipes.find(r => r.id === recipeId);
      return currRecipe.versions.find(v => v.id === versionId);
    },
    isRecipeActive: ({ activeRecipe }) => id => activeRecipe?.id === id,
    activeRecipe: s => s.activeRecipe,
    currentRootRecipe: s => s.currentRootRecipe
  },
  modules: {
    snackbar
  }
});
