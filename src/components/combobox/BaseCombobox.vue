<template>
  <div class="el-wrapper">
    <label :for="config.id" class="el__label" v-if="config.label">
      {{ config.label }}
      <span v-if="config.required" style="color: var(--error-color)">*</span>
    </label>
    <div
      class="combobox"
      :style="'width: ' + config.width"
      v-if="config.options"
    >
      <input
        ref="input"
        :type="config.inputType"
        class="input combobox__input"
        :id="config.id"
        :disabled="config.disabled"
      />
      <input
        ref="sendInput"
        :type="config.inputType"
        hidden
        :name="config.name"
      />
      <button @click="toggleOptionList" class="combobox__button" ref="button">
        <i class="icon-16 icon-down"></i>
      </button>
      <ul :class="config.optionClass" v-show="showOption.status">
        <li
          v-for="(option, index) in config.options"
          :key="option"
          class="option__item"
          :skey="option"
          :id="index"
          @click="selectOption"
        >
          {{ option }}
        </li>
      </ul>
    </div>
    <div class="combobox" :style="'width: ' + config.width" v-else>
      <input
        ref="input"
        :type="config.inputType"
        class="input combobox__input"
        :id="config.id"
        :disabled="config.disabled"
      />
      <input
        ref="sendInput"
        :type="config.inputType"
        hidden
        :name="config.name"
      />
      <button @click="toggleOptionList" class="combobox__button" ref="button">
        <i class="icon-16 icon-down"></i>
      </button>
      <ul :class="config.optionClass" v-show="showOption.status">
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
    parent:{
      type: Object
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
    };
  },
  methods: {
    /**
     * Ẩn hiện option combobox
     * Author: MDLONG(30/10/2022)
     */
    toggleOptionList: function () {
      this.callApi();
      this.showOption.status = !this.showOption.status
    },
    /**
     * Ẩn option combobox
     * Author: MDLONG(30/10/2022)
     */
    hideOptionList: function (e) {
      if (!this.$el.contains(e.target)) {
        this.showOption.status = false;
      }
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
          })
      }
    },
    /**
     * Xử lý chọn option
     * Author: MDLONG(30/10/2022)
     * @param {event} e
     */
    selectOption: function (e) {
      this.showOption.status = false;
      Array.from(this.$el.querySelectorAll(".option__item")).forEach(
        (element) => {
          element.classList.remove("selected");
        }
      );
      e.target.classList.add("selected");
      this.$refs.input.value = e.target.innerText;
      this.$refs.sendInput.value = e.target.getAttribute("skey");
      if(this.$props.parent){
        this.$props.parent.resize(this.$refs.sendInput.value)
        // console.log(this.$props.parent)
        this.$props.parent.loadData()
      }
    },
    
    /**
     * Đặt giá trị default
     * Author: MDLONG(30/10/2022)
     */
    setDefault: function () {
      this.showOption.selected = this.$props.config.selected || 0;
      this.$el.querySelectorAll('li').forEach((el, index)=>{
        if(index == this.showOption.selected){
          el.classList.add('selected');
          this.$refs.input.value = el.innerText
          this.$refs.sendInput.value = el.getAttribute('skey')
          return
        }
      })
    },
    /**
     * Ẩn option khi click outside
     * Author: MDLONG(30/10/2022)
     */
    outsideHideOption: function () {
      window.addEventListener("click", this.hideOptionList);
    },
  },

  created() {
  },
  mounted() {
    this.setDefault();
    this.outsideHideOption();
  },
  unmounted() {
    // Xóa sự kiện
    window.removeEventListener("click", this.hideOptionList);
  },
};
</script>
<style></style>
