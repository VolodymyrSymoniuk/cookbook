<template>
  <div class="ninja-input">
    <p
      class="contenteditable"
      ref="editable"
      contenteditable
      v-on="listeners"
    />
    <v-icon class="tip-edit">
      mdi-pencil
    </v-icon>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ""
    }
  },
  computed: {
    listeners() {
      return { ...this.$listeners, input: this.onInput };
    }
  },
  mounted() {
    this.$refs.editable.innerText = this.value;
  },
  methods: {
    onInput(e) {
      this.$emit("input", e.target.innerText);
    }
  }
};
</script>

<style lang="scss" scoped>
.ninja-input {
  position: relative;
  width: 100%;

  .contenteditable {
    padding: 6px;
    margin-bottom: 0;

    &:focus {
      box-shadow: inset 0 0 0 1px #444;
      background-color: #f1f1f1;
      border-radius: 3px;
    }
  }

  .tip-edit {
    position: absolute;
    right: 6px;
    bottom: 10px;
  }
}
</style>
