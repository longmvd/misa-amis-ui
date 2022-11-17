<template>
  <div class="content">
    <div class="top-content">
      <div class="content-title">
        <h1>Nhân viên</h1>
      </div>
      <div class="button-group">
        <base-button
          buttonClass="btn--pri btn--add"
          :components="[{ content: 'Thêm mới nhân viên' }]"
          @click="storeEmployee.showAddEmployee"
        />
      </div>
    </div>
    <!-- table -->
    <div class="el-wrapper body-content">
      <!-- <label class="input__label" for="">4. Table</label> -->

      <base-table
        :tablePopup="employeePopup"
      ></base-table>
    </div>
    <div class="loading"></div>
    <div class="dialog">
      <div class="dialog-wrapper">
        <div class="dialog__header-wrapper">
          <div class="dialog__header">Thông báo</div>
          <button class="dialog__button dialog__close" id=""></button>
        </div>
        <div class="dialog__body">Bạn có chắc chắn muốn xóa abc không?</div>
        <div class="dialog__footer">
          <button class="btn btn--pri display-none" style="order: 2">Có</button>
          <button
            class="btn btn--extra btn--cancel display-none"
            style="order: 1"
          >
            Không
          </button>
        </div>
      </div>
    </div>

    <!-- employee popup form-->

    <employee-detail />
  </div>
</template>

<script>
import BaseTable from "../BaseTable.vue";
import BaseButton from "@/components/buttons/BaseButton.vue";
import EmployeeDetail from "../form/EmployeeDetail.vue";
import { useEmployeeDetailState } from "@/stores/employeeForm/employeeDetail";

export default {
  name: "AmisContent",
  components: {
    BaseTable,
    BaseButton,
    EmployeeDetail,
  },
  setup() {
    const storeEmployee = useEmployeeDetailState();
    return { storeEmployee };
  },
  data() {
    return {
      employeePopup: {
        status: false,
        object: {},
      },
      comboboxConfig: {
        id: "employee-department",
        name: "departmentid",
        inputType: "text",
        label: "Đơn vị",
        required: true,
        api: "https://amis.manhnv.net/api/v1/Departments",
        objectName: "Department",
        optionClass: "combobox__option max-height-200",
      },
    };
  },
  methods: {},
  props: {},
  mounted() {},
  updated() {},
};
</script>
<style></style>
