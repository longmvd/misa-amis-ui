<template>
  <ul
    class="option-tooltip"
    v-show="config.isShow"
    :style="`top: ${config.position.y}px; right: ${config.position.x}px;`"
    ref="options"
  >
    <li
      v-for="(option, index) in config.options"
      :key="option.value"
      class="option__item"
      :skey="option.value"
      :id="index"
      :value="option.value"
      @click="selectOption"
    >
      {{ option.key }}
    </li>
  </ul>
</template>
<script>
export default {
  name: "OptionTooltip",
  props: {
    config: {
      type: Object,
    },
  },
  emits: ["selectValue"],
  data() {
    return {
      position: {
        x: null,
        y: null,
      },
      selected: null,
    };
  },
  methods: {
    selectOption: function (event) {
      this.selected = event.target.getAttribute("value");
      this.$emit("selectValue", this.selected);
    },
  },
};
</script>
<style scope>
.option-tooltip {
  z-index: 1;
  position: fixed;
  background-color: #fff;
  padding: 8px;
  margin: 0;
  width: 145px;
  box-sizing: border-box;
  border-radius: 4px;
  box-shadow: 0px 14px 19px #a9a9a9;
  overflow-y: auto;
  top: 12px;
  right: 0px;
}
</style>
