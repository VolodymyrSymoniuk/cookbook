<template>
  <v-list dense>
    <v-subheader>Ingredients:</v-subheader>
    <v-list-item-group>
      <v-list-item v-for="(ingredient, i) of ingredients" :key="i">
        <v-list-item-content>
          <v-list-item-title>{{ ingredient.name }}</v-list-item-title>
        </v-list-item-content>
        <v-list-item-icon @click.stop="removeIngredient(ingredient.id)">
          <v-icon>mdi-close</v-icon>
        </v-list-item-icon>
      </v-list-item>

      <v-list-item @click="newIngredientFocus">
        <v-list-item-content>
          <input
            ref="newIngredientInput"
            v-model.trim="newIngredient"
            class="disguised-input"
          />
        </v-list-item-content>
        <v-list-item-icon @click.stop="addIngredient">
          <v-icon>mdi-plus</v-icon>
        </v-list-item-icon>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>

<script>
import shortid from "shortid";

export default {
  name: "IngredientsList",
  props: ["ingredients"],
  data: () => ({
    newIngredient: "new ingredient"
  }),
  methods: {
    newIngredientFocus() {
      this.$refs.newIngredientInput.focus();
    },
    addIngredient() {
      if (!this.newIngredient) {
        this.newIngredient = "ingredient can not be empty";
        return;
      }

      this.$emit("add", {
        id: shortid.generate(),
        name: this.newIngredient
      });
      this.newIngredient = "new ingredient";
    },
    removeIngredient(id) {
      this.$emit("remove", id);
    }
  }
};
</script>
