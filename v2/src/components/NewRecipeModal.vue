<template>
  <v-dialog v-model="isShown" persistent max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">New recipe</span>
      </v-card-title>
      <v-card-text>
        <v-text-field
          color="teal"
          v-model.trim="title"
          label="Title..."
        ></v-text-field>
        <v-textarea
          color="teal"
          v-model.trim="description"
          label="Description..."
        ></v-textarea>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="teal darken-1" text @click="close">
          Close
        </v-btn>
        <v-btn color="teal darken-1" text @click="save">
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
    <Snackbar />
  </v-dialog>
</template>

<script>
import { mapActions } from "vuex";
import Snackbar from "@/common/Snackbar";

export default {
  components: { Snackbar },
  props: ["isShown"],
  data: () => ({
    title: "",
    description: ""
  }),
  methods: {
    ...mapActions("snackbar", ["showSnack"]),
    showError(message) {
      this.showSnack({
        text: message,
        color: "error",
        timeout: 2000
      });
    },
    close() {
      this.$emit("close");
      this.clear();
    },
    save() {
      if (!this.title || !this.description) {
        this.showError("Invalid data entered");
        return;
      }

      this.$emit("save", {
        title: this.title,
        description: this.description
      });
      this.clear();
    },
    clear() {
      this.title = "";
      this.description = "";
    }
  }
};
</script>

<style></style>
