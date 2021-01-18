<template>
  <div id="app" class="container">
    <RecipeTree />
    <Recipe />
  </div>
</template>

<script>
import Recipe from "@/components/Recipe";
import RecipeTree from "@/components/RecipeTree";

export default {
  name: "App",
  components: { Recipe, RecipeTree }
};
</script>

<style lang="scss">
@import "assets/index.scss";
</style>
