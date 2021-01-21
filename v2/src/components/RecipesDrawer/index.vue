<template>
  <v-navigation-drawer
    width="40%"
    :value="drawer"
    @input="$emit('toggle-drawer')"
    absolute
    temporary
    right
  >
    <template v-slot:prepend>
      <Breadcrumbs />
      <v-divider></v-divider>
      <List />
    </template>
  </v-navigation-drawer>
</template>

<script>
import Breadcrumbs from "./Breadcrumbs";
import List from "./List";

export default {
  name: "RecipesDrawer",
  components: { Breadcrumbs, List },
  props: ["drawer"]
};
</script>
