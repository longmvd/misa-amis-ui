<template>
  <div class="el-wrapper ">
    <label :for="config.id" class="el__label" v-if="config.label">
      {{ config.label }}
      <span v-if="config.required" style="color: var(--error-color)">*</span>
    </label>
    <div
      class="combobox-function"
      :style="'width: ' + config.width"
      v-if="config.options"
    >
      <button @click="displayPopup" class="button-left">
        {{ config.buttonLeft.title }}
      </button>
      <button @click="toggleOptionList"  class="combobox__button bg-none action-button" ref="button">
        <i  class="icon-16 icon-up--blue action-button"></i>
      </button>
      
    </div>
    <div class="combobox" :style="'width: ' + config.width" v-else>
      <button @click="displayPopup" class="button-left">
        {{ config.buttonLeft.title }}
      </button>
      <button @click="toggleOptionList" class="combobox__button bg-none" ref="button">
        <i  class="icon-16 icon-up--blue"></i>
      </button>
      <ul :class="config.optionClass" v-show="showOption.status" ref="options">
        <li
          v-for="(option, index) in showOption.options"
          :key="option[config.objectName + 'Id']"
          class="option__item"
          :id="index"
          :skey="option[config.objectName + 'Id']"
          @click="selectOption"
        >
          {{ option[config.objectName + "Name"] }}
        </li>
      </ul>
    </div>
    
    <span class="err-message">Lỗi không để trống</span>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "BaseTooltip",
  props: {
    config: {
      type: Object,
    },
    parent: {
      type: Object,
    },
  },
  data() {
    return {
      showOption: {
        status: false,
        options: [],
        errors: [],
        selected: 0,
      },
      sendMessage:{
        //vị trí hiển thị tooltip
        showOptions: false,
        position: {
          x: 0,
          y: 0,
        },
        //hàng được chọn
        object: {
          id: null,
        },
      }
    };
  },
  emits:['toggleOption','hideOption'],
  methods: {
    /**
     * Ẩn hiện option combobox
     * Author: MDLONG(30/10/2022)
     */
    toggleOptionList: function (e) {
      // this.callApi()
      this.showOptions(e)
    },
    /**
     * Ẩn option combobox
     * Author: MDLONG(30/10/2022)
     */
    hideOptionList: function () {
      // if (!this.$el.contains(e.target)) {
      //   // console.log(this.$el)
      //   console.log('ieieiei')
      //   // this.sendMessage.showOptions = false;
      // }
      this.$emit('hideOption', 20)
    },
    /**
     * Gọi API
     * Author: MDLONG(30/10/2022)
     */
    callApi: function () {
      if(this.$props.config.api){
        axios
          .get(this.$props.config.api)
          .then((response) => {
            this.showOption.options = response.data;
          })
          .catch((e) => {
            this.showOption.errors.push(e);
          });
      }
    },
    /**
     * Xử lý chọn option
     * Author: MDLONG(30/10/2022)
     * @param {event} e
     */
    selectOption: function (e) {
      this.showOption.status = false;
      e.target;
      // Array.from(this.$el.querySelectorAll(".option__item")).forEach(
      //   (element) => {
      //     element.classList.remove("selected");
      //   }
      // );
      // e.target.classList.add("selected");
      // if(this.$props.parent){
      //   this.$props.parent.resize(this.$refs.sendInput.value)
      //   console.log(this.$props.parent)
      //   // this.$props.parent.loadData()
      // }
    },

    /**
     * Ẩn option khi click outside
     * Author: MDLONG(30/10/2022)
     */
    outsideHideOption: function () {
      
      window.addEventListener("click", this.hideOptionList);
    },
    showOptions: function (event) {
      let pos = event.target.getBoundingClientRect()
      if(event.target.tagName !== 'BUTTON'){
        pos = event.target.parentNode.getBoundingClientRect()
      }

      let x = vw(100) - pos.right;
      let y = pos.top + 40;
      let message = this.sendMessage
      
      message.showOptions = !this.sendMessage.showOptions
      message.position.x = x
      message.position.y = y
      message.object.id = this.$props.config.object.id
      this.$emit('toggleOption', message)
    },
  },

  created() {
    this.outsideHideOption();
  },
  mounted() {
    
  },
  unmounted() {
    // Xóa sự kiện
    window.removeEventListener("click", this.hideOptionList);
  },
};
/**
 * Tính vw
 * @param {Number} percent 
 * Author: MDLONG(30/10/2022)
 */
function vw(percent) {
  var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  return (percent * w) / 100;
}
</script>
<style scope>
.combobox-function{
    height: var(--combobox-height);
    border-radius: 4px;
    outline: none;
    display: flex;
    position: relative;
    align-items: center;
    margin: 8px 0;
}

.combobox-function:hover .combobox__button,
.combobox__dropdown {
  background: none;
}

.button-left {
  cursor: pointer;
  background: none;
  height: 34px;
  outline: none;
  border: none;
}

.combobox-function .combobox__option {
  overflow: unset;
  position: fixed;
  width: 145px;
}
</style>
