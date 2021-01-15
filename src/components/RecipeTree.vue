<template>
  <section>
    <ul>
      <RecipeTreeItem :recipeId="rootRecipeId"></RecipeTreeItem>
    </ul>
  </section>
</template>

<script>
import RecipeTreeItem from "@/components/RecipeTreeItem";
import { mapGetters } from "vuex";

export default {
  name: "RecipeTree",
  components: { RecipeTreeItem },
  mounted() {
    this.$store.dispatch("fetchRecipes");
  },
  computed: {
    ...mapGetters(["rootRecipeId"])
  }
};
</script>
