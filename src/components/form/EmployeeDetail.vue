<template>
  <div v-if="storeEmployee.isShow" class="employee-popup" id="employee-form">
    <div class="popup-wrapper">
      <div class="popup__header">
        <div class="popup-title">
          <h1>{{ setTitle() }}</h1>
          <div class="popup-cb-wrapper">
            <input type="checkbox" class="c1 input-20" id="customer" />
            <label for="customer" class="popup-title-label"
              >Là khách hàng</label
            >
          </div>
          <div class="popup-cb-wrapper">
            <input type="checkbox" class="c1 input-20" id="supplier" />
            <label for="supplier" class="popup-title-label"
              >Là nhà cung cấp</label
            >
          </div>
        </div>
        <div class="popup-close" @click="storeEmployee.hideEmployeeDetail">
          <i class="icon-24 icon-help mgr-8 cs-pointer"></i>
          <i class="icon-24 icon-close cs-pointer" title="Đóng"></i>
        </div>
      </div>
      <div class="popup__body">
        <div class="popup-top">
          <div class="popup-left w-1/2">
            <div class="flex">
              <div class="el-wrapper w-2/5">
                <label for="employee-code" class="el__label mgt-0"
                  >Mã <span style="color: var(--error-color)">*</span></label
                >
                <div class="relative mgr-8">
                  <input
                    class="input"
                    type="text"
                    id="employee-code"
                    name="employeecode"
                  />
                </div>
                <span class="err-message">Lỗi không để trống</span>
              </div>
              <div class="el-wrapper flex-1">
                <label for="employee-name" class="el__label mgt-0"
                  >Tên <span style="color: var(--error-color)">*</span></label
                >
                <div class="relative">
                  <input
                    class="input"
                    type="text"
                    id="employee-name"
                    name="employeename"
                  />
                </div>
                <span class="err-message">Lỗi không để trống</span>
              </div>
            </div>
            <!-- <div class="el-wrapper">
                <label for="employee-department" class="el__label"
                  >Đơn vị
                  <span style="color: var(--error-color)">*</span></label
                >
                <div class="combobox">
                  <input
                    type="text"
                    class="input combobox__input"
                    id="employee-department"
                    name="employeedepartment"
                  />
                  <button class="combobox__button">
                    <i class="icon-16 icon-down"></i>
                  </button>
                  <ul class="combobox__option max-height-200">
                    <li class="option__item">Hà Nội</li>
                    <li class="option__item">Đà Nẵng</li>
                    <li class="option__item">Hải Phòng</li>
                    <li class="option__item">TP HCM</li>
                  </ul>
                </div>
                <span class="err-message">Lỗi không để trống</span>
              </div> -->
            <!-- <base-combobox :config="comboboxConfig"></base-combobox> -->
            <div class="el-wrapper">
              <label for="employee-position" class="el__label">Chức danh</label>
              <div class="relative">
                <input
                  class="input"
                  type="text"
                  id="employee-position"
                  name="employeeposition"
                />
              </div>
              <span class="err-message">Lỗi không để trống</span>
            </div>
          </div>
          <div class="popup-right">
            <div class="flex el--center">
              <div class="el-wrapper mgr-8 w-2\/5">
                <label for="employee-dob" class="el__label mgt-0"
                  >Ngày sinh</label
                >
                <div class="relative">
                  <input
                    class="input"
                    type="date"
                    id="employee-dob"
                    name="dateofbirth"
                  />
                </div>
                <span class="err-message">Lỗi không để trống</span>
              </div>
              <div class="el-wrapper">
                <label for="employee-gender" class="el__label mgt-0"
                  >Giới tính</label
                >
                <div class="gender">
                  <label for="" class="flex el--center gender__label">
                    <input
                      type="radio"
                      class="c1 input-20"
                      value="1"
                      name="gender"
                    />
                    <span>Nam</span>
                  </label>
                  <label for="" class="flex el--center gender__label">
                    <input
                      type="radio"
                      class="c1 input-20"
                      value="0"
                      name="gender"
                    />
                    <span>Nữ</span>
                  </label>
                  <label for="" class="flex el--center gender__label">
                    <input
                      type="radio"
                      class="c1 input-20"
                      value="2"
                      name="gender"
                    />
                    <span>Khác</span>
                  </label>
                </div>
              </div>
            </div>
            <div class="flex">
              <div class="el-wrapper w-3/5">
                <label for="employee-idcard" class="el__label">Số CMND</label>
                <div class="relative mgr-8">
                  <input
                    class="input"
                    type="text"
                    id="employee-idcard"
                    name="identitynumber"
                  />
                </div>
                <span class="err-message">Lỗi không để trống</span>
              </div>
              <div class="el-wrapper">
                <label for="employee-idcard-date" class="el__label"
                  >Ngày cấp</label
                >
                <div class="relative">
                  <input
                    class="input"
                    type="date"
                    id="employee-idcard-date"
                    name="identitydate"
                  />
                </div>
                <span class="err-message">Lỗi không để trống</span>
              </div>
            </div>
            <div class="el-wrapper">
              <label for="employee-idcard-place" class="el__label"
                >Nơi cấp</label
              >
              <div class="relative">
                <input
                  class="input"
                  type="text"
                  id="employee-idcard-place"
                  name="identityplace"
                />
              </div>
              <span class="err-message">Lỗi không để trống</span>
            </div>
          </div>
        </div>
        <div class="popup-bot">
          <div class="el-wrapper">
            <label for="employee-address" class="el__label mgt-0"
              >Địa chỉ</label
            >
            <div class="relative">
              <input
                class="input"
                type="text"
                id="employee-address"
                name="address"
              />
            </div>
            <span class="err-message">Lỗi không để trống</span>
          </div>
          <div class="flex">
            <div class="el-wrapper w-1/4">
              <label for="employee-phone" class="el__label">ĐT Di động</label>
              <div class="relative mgr-8">
                <input
                  class="input"
                  type="text"
                  id="employee-phone"
                  name="phonenumber"
                />
              </div>
              <span class="err-message">Lỗi không để trống</span>
            </div>
            <div class="el-wrapper w-1/4">
              <label for="employee-telephone" class="el__label"
                >ĐT cố định</label
              >
              <div class="relative mgr-8">
                <input
                  class="input"
                  type="text"
                  id="employee-telephone"
                  name="telephonenumber"
                />
              </div>
              <span class="err-message">Lỗi không để trống</span>
            </div>
            <div class="el-wrapper w-1/4">
              <label for="employee-email" class="el__label">Email</label>
              <div class="relative mgr-8">
                <input
                  class="input"
                  type="text"
                  id="employee-email"
                  name="email"
                />
              </div>
              <span class="err-message">Lỗi không để trống</span>
            </div>
          </div>
          <div class="flex">
            <div class="el-wrapper w-1/4">
              <label for="employee-bankaccounut" class="el__label"
                >Tài khoản ngân hàng</label
              >
              <div class="relative mgr-8">
                <input
                  class="input"
                  type="text"
                  id="employee-bankaccount"
                  name="bankaccountnumber"
                />
              </div>
              <span class="err-message">Lỗi không để trống</span>
            </div>
            <div class="el-wrapper w-1/4">
              <label for="employee-bankname" class="el__label"
                >Tên ngân hàng</label
              >
              <div class="relative mgr-8">
                <input
                  class="input"
                  type="text"
                  id="employee-bankname"
                  name="bankname"
                />
              </div>
              <span class="err-message">Lỗi không để trống</span>
            </div>
            <div class="el-wrapper w-1/4">
              <label for="employee-bankbracnh" class="el__label"
                >Chi nhánh</label
              >
              <div class="relative mgr-8">
                <input
                  class="input"
                  type="text"
                  id="employee-bankbranch"
                  name="banknranchname"
                />
              </div>
              <span class="err-message">Lỗi không để trống</span>
            </div>
          </div>
        </div>
      </div>
      <div class="popup__footer">
        <div class="popup-button__left">
          <base-button
            buttonClass="btn--extra"
            :components="[{ content: 'Hủy' }]"
            @click="storeEmployee.hideEmployeeDetail"
          />
        </div>
        <div class="popup-button__right">
          <base-button
            buttonClass="btn--extra mgr-8"
            :components="[{ content: 'Cất' }]"
            buttonId="save-employee"
            
          />
          <base-button
            buttonClass="btn--pri"
            :components="[{ content: 'Cất và Thêm' }]"
            @click="storeEmployee.hideEmployeeDetail"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { useEmployeeDetailState } from "@/stores/employeeForm/employeeDetail";
import BaseButton from "@/components/buttons/BaseButton.vue";
import FORM_MODE from "@/utils/formMode";
import Validator from "@/js/validator";
import * as resources from "@/i18n/resources";
export default {
  components: { BaseButton },
  setup() {
    const storeEmployee = useEmployeeDetailState();
    const RESOURCES = resources;
    return { storeEmployee, RESOURCES };
  },
  data() {
    // eslint-disable-next-line
    return {
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
      employee: this.storeEmployee.selectedEmployee,
    };
  },
  methods: {
    setTitle() {
      switch (this.storeEmployee.mode) {
        case FORM_MODE.ADD:
          return this.RESOURCES.EMPLOYEE_DETAILS.ADD_MODE_TITLE;
        case FORM_MODE.EDIT:
          return this.RESOURCES.EMPLOYEE_DETAILS.EDIT_MODE_TITLE;
      }
    },
    validate(){
      const storeEmployee = this.storeEmployee
      let validator = new Validator({
        form: "#employee-form",
        errorSelector: ".err-message",
        formGroupSelector: ".el-wrapper",
        buttonSubmit: "#save-employee",
        rules: [
          Validator.isRequire("#employee-code", "Vui lòng nhập mã nhân viên"),
          // Validator.isRequire("#employee-department", "Vui lòng chọn đơn vị"),
          Validator.isRequire("#employee-name", "Không để trống"),
          Validator.isEmail("#employee-email", "Vui lòng nhập đúng email"),
          Validator.isPhone(
            "#employee-phone",
            "Vui lòng nhập đúng số điện thoại"
          ),
          Validator.isPhone(
            "#employee-telephone",
            "Vui lòng nhập đúng số điện thoại"
          ),
          Validator.minLength("#employee-idcard", 12),
        ],
        defaults: [Validator.defaultValue('input[name="gender"]', 1)],
        onSubmit: function (value) {
          var data = { ...value, departmentid: '469b3ece-744a-45d5-957d-e8c757976496' };
          console.log(data)
          storeEmployee.selectEmployee(data)
          storeEmployee.sendData()
          
        },
      
      })
      validator.execute()

    }
  },
  mounted() {
      this.validate()
    },
  updated() {
    this.validate()
  },
};
</script>
<style></style>
