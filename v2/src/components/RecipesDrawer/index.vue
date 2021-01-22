<template>
  <v-navigation-drawer
    class="overflow-y-auto"
    :value="drawer"
    @input="setDrawer"
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
  components: { Breadcrumbs, List },
  props: ["drawer"],
  methods: {
    setDrawer(drawer) {
      this.$emit("set-drawer", drawer);
    }
  }
};
</script>
