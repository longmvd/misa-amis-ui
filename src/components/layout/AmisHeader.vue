<template>
  <header class="header">
    <div class="header__left">
      <base-button  class="btn--square bg-none" id="btn-bar--black" :components="barButton" ref="barButton"/>
      <h1>Công ty cổ phần A</h1>
    </div>
  
    <div  class="header__right">
      <base-button class="btn--square bg-none have-tooltip" tooltip="Thông báo" :components="bellButton"/>
      <base-button class="btn btn-user" :components="userButtonCompo"/>
    </div>
  </header>
</template>

<script>
import BaseButton from '@/components/buttons/BaseButton.vue'
// import { minimizeSidebar } from '../../js/components/sidebar.js';
export default {
  name: 'AmisHeader',
  props: {
    
  },
  data(){
    return {
      barButton:[{class: 'icon-24 icon-bar'}],
      barTooltip:{
        isShow: true,
        title: 'Thu nhỏ sidebar',
        position: {top}
      },
      bellButton: [{class: 'icon-24 icon-bell'}],
      userButtonCompo:[{class: 'icon-user icon-avatar'}, {class: 'user-name fsn', content:'Mai Đại Long'}, { class:"icon-16 icon-down"}]
    }
  },
  components: {
    BaseButton
  },
  
};

</script>
<style>
.header{
    position: sticky;
    /* border: 1px solid; */
    z-index: 1;
    left: var(--side-bar-width);
    top: 0;
    right: 0;
    bottom: 56px;
    background-color: var(--white-color);
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.header__left, .header__right{
    display: flex;
    align-items: center;
}

.header__left h1{
    margin-left: 10px;
}

.header__right .btn:not(:last-child){
    margin-right: 18px;
}

.btn-user{
    background-color: var(--white-color);
    margin-right: 8px;
}

#btn-bar--black{
    margin-left: 10px;
}

.menu__item{
    display: flex;
    align-items: center;
    margin-right: 32px;
}

.logo{
    background: url(../../assets/img/Logo_Module_TiengViet_White.66947422.svg) no-repeat;
    width: 112px;
    height: 36px;
    background-size: 100%;
}

.down-icon-menu{
    background: url('../../assets/img/Sprites.64af8f61.svg')no-repeat -1123px -357px;
    width: 24px;
    height: 24px;
}

.user-name{
    margin: 0 8px 0 6px;
}

.btn-user{
    display: flex;
    align-items: center;
    padding-right: 24px;
}

</style>
