<template>
  <button
    :class="'btn ' + config.buttonClass"
    :tooltip="config.tooltip"
    @mouseenter="onHover"
    @mouseleave="onHover"
  >
    <i :class="config.iconClass + '--bold'" v-if="hover"></i>
    <i :class="config.iconClass + '--light'" v-else></i>
  </button>
</template>

<script>
// import BaseTooltip from './BaseTooltip.vue'
export default {
  name: "ToggleButton",
  props: {
    config: Object,
    isHover: Boolean,
    tooltip: String,
    onHover: Function,
    onDbClick: Function,
  },
  watch:{
    isHover(newValue){
      this.hover = newValue
    }
  },
  data(){
    return { 
        hover: false
    }
  },
  components: {
    // BaseTooltip
  },
};
</script>

<style>
/* @import url(./css/components/button.css); */
</style>
