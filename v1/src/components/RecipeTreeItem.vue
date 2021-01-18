<template>
  <li>
    <div
      :class="[isFolder ? 'bold' : '', 'item', 'pointer']"
      @click="toggle"
      @dblclick="makeFolder"
    >
      {{ item.description }}
      <span v-if="isFolder">[{{ isOpen ? "-" : "+" }}]</span>
      <span
        v-if="!isRoot"
        @click.stop="displayRecipe"
        class="material-icons show-icon"
        :class="{ active: isRecipeActive }"
      >
        visibility
      </span>
    </div>
    <ul v-show="isOpen" v-if="isFolder" class="children">
      <RecipeTreeItem
        v-for="(childId, index) in item.children"
        :key="index"
        :recipeId="childId"
      ></RecipeTreeItem>
      <li class="pointer add-item" @click="addItem">+</li>
    </ul>
  </li>
</template>

<script>
import shortid from "shortid";
import { mapMutations, mapActions } from "vuex";
import RecipeTreeItem from "@/components/RecipeTreeItem";

export default {
  name: "RecipeTreeItem",
  components: { RecipeTreeItem },
  props: {
    recipeId: String
  },
  data: () => ({
    isOpen: false
  }),
  mounted() {
    if (this.isRoot) {
      this.isOpen = true;
    }
  },
  computed: {
    item() {
      return this.$store.getters.getRecipeById(this.recipeId);
    },
    isFolder() {
      return this.item.children && this.item.children.length;
    },
    isRoot() {
      return this.recipeId === this.$store.getters.rootRecipeId;
    },
    isRecipeActive() {
      return this.$store.getters.isRecipeActive(this.recipeId);
    }
  },
  methods: {
    ...mapMutations(["setActiveRecipeById", "makeRecipeParent"]),
    ...mapActions(["addNewRecipe"]),
    toggle() {
      if (this.isFolder) {
        this.isOpen = !this.isOpen;
      }
    },
    makeFolder() {
      if (!this.isFolder) {
        this.makeRecipeParent(this.item);
        this.addItem(this.item);
        this.isOpen = true;
      }
    },
    async addItem() {
      let { id: parent, description } = this.item;
      if (parent === "root") {
        try {
          description = await this.$prompt("Enter description of new recipe:");
        } catch (_) {
          this.$alert("Invalid recipe description entered!");
          return;
        }
      }

      this.addNewRecipe({
        id: shortid.generate(),
        description,
        versions: [],
        parent,
        createdAt: Date.now()
      });
    },
    displayRecipe() {
      this.setActiveRecipeById(this.recipeId);
    }
  }
};
</script>
