<template>
  <div class="main">
    <amis-sidebar/>
    <amis-container/>
    <a href="" class="tooltip"></a>
    <!-- <button-combobox :config="comboboxConfig"/> -->
  </div>
  
</template>

<script>
import AmisSidebar from './components/layout/AmisSidebar.vue'
import AmisContainer from './components/layout/AmisContainer.vue';
// import initEvent from './js/index.js'
import { handleTooltip } from './js/components/tooltip.js';
import { handleEnlargeSidebar, handleMinimizeSidebar } from './js/components/sidebar';
import {useEmployeeState} from '@/stores/employee/employee'
import { useEmployeeDetailState } from './stores/employeeForm/employeeDetail';
// import * as employeeService from '@/services/employeeService'
// import ButtonCombobox from './components/combobox/ButtonCombobox.vue'
export default {
  name: 'App',
  components:{
    AmisSidebar,
    AmisContainer,
    // ButtonCombobox
  },
  props: {

  },
  setup() {
    // eslint-disable-next-line
    const storeEmployee = useEmployeeState();
    const employeeDetail = useEmployeeDetailState();
    return {employeeDetail, storeEmployee}
  },
  data(){
    return{
        
    }
  },
  methods:{
    
  },
  created(){
    // this.storeEmployee.fetchFilters();
    // eslint-disable-next-line 
    // debugger
    // async function fetchApi(){
    //   const employee = await employeeService.filters('10', '1', 'long', '', '')
    //   console.log(employee)
      
    // }
    // fetchApi()

  },
  updated() {
    
  },
  mounted(){
    handleTooltip.call(this)
    handleMinimizeSidebar.call(this)
    handleEnlargeSidebar.call(this)
    // initEvent()
  }
}

</script>

<style>
@import url(./css/main.css);
</style>
