<template>
  <section class="recipe">
    <div v-if="!recipe" class="recipe-default-text">
      <p>Click on the eye to display the recipe.</p>
      <p>Double-click on the recipe in the list to create a child branch.</p>
      <p>Stop editing recipe description for 3 seconds to save.</p>
    </div>
    <template v-else>
      <div class="recipe-description">
        <NinjaInput
          :key="recipe.id"
          v-model="description"
          class="description-input"
        />
        <span class="material-icons tip-edit">
          create
        </span>
      </div>
      <template v-if="recipe.versions.length">
        <p>Versions:</p>
        <ul>
          <li v-for="(version, index) of recipe.versions" :key="index">
            {{ version }}
          </li>
        </ul>
      </template>
      <small class="recipe-creation-date">
        Created at: <time>{{ recipe.createdAt | date }}</time>
      </small>
    </template>
  </section>
</template>

<script>
import { debounce } from "lodash";
import { mapGetters, mapMutations } from "vuex";
import NinjaInput from "@/common/NinjaInput";

export default {
  name: "Recipe",
  components: { NinjaInput },
  data: () => ({
    description: ""
  }),
  created() {
    this.debouncedUpdateRecipe = debounce(this.updateRecipe, 3000);
  },
  computed: {
    ...mapGetters({ recipe: "currentRecipe" })
  },
  watch: {
    recipe: function({ description }) {
      this.description = description;
    },
    description: function(newDescription, oldDescription) {
      this.debouncedUpdateRecipe(newDescription, oldDescription);
    }
  },
  methods: {
    ...mapMutations(["updateRecipeWithDescription"]),
    updateRecipe(newDescription, oldDescription) {
      if (
        !oldDescription.trim() ||
        !newDescription.trim() ||
        this.recipe.description === newDescription.trim()
      )
        return;

      this.updateRecipeWithDescription({
        description: newDescription,
        id: this.recipe.id
      });
    }
  }
};
</script>
