<template>
  <div class="table-tool">
    <div class="relative table-tool__right">
      <input
        type="text"
        class="input table-tool__search"
        placeholder="Tìm theo mã, số điện thoại,..."
        @input="doSearch"
      />
      <i class="search-icon left"></i>
    </div>

    <toggle-button
      :onHover="onHoverReload"
      :onClick="refreshPage"
      :isHover="hoverReload"
      :config="{
        buttonClass: 'btn--square bg-none btn--reload',
        iconClass: 'icon-24 icon-reload',
        tooltip: 'Làm mới',
      }"
    />
  </div>
  <div :class="ATTRIBUTE.CLASS">
    <div class="table">
      <table :id="ATTRIBUTE.ID" v-if="showTable.data">
        <thead>
          <tr>
            <th>
              <input
                class="c1"
                type="checkbox"
                @click="employeeState.toggleCheckAll"
              />
            </th>
            <th
              v-for="(TH, index) in ATTRIBUTE.TH"
              :key="index"
              :class="TH.TEXT_ALIGN"
              :style="'min-width: ' + TH.MIN_WIDTH + 'px'"
            >
              {{ TH.TITLE }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(data, index) in showTable.data.Data"
            :key="index"
            :id="index"
            @dblclick="employeeDetailState.showEditEmployee(data)"
          >
            <td class="text-center">
              <input
                class="c1 employee-checkbox"
                type="checkbox"
                ref="employeeCheckbox"
              />
            </td>
            <!-- eslint-disable-next-line -->
            <td v-for="index in ATTRIBUTE.TH.length - 1" :key="index">
              {{ filterDate(filterFalsy(data[column[index]])) }}
            </td>
            <td class="text-center">
              <button-combobox
                @toggleOption="getRowAction"
                :config="{
                  ...functionComboboxConfig,
                  object: { id: data.EmployeeId },
                }"
                ref="actionButton"
              />
            </td>
          </tr>
        </tbody>
        <!-- <tbody v-html="showTable.display.tableBody"></tbody> -->
      </table>
      <div v-else><span>Không có dữ liệu</span></div>
      <option-tooltip
        :config="optionTooltip"
        @selectValue="doRowAction"
        @hideOption="doHideOption"
      />
    </div>
    <div class="paging" v-if="showTable.data">
      <div class="paging__left">
        Tổng:
        <span style="font-weight: 600">{{ showTable.data.TotalPage }}</span>
      </div>
      <div class="paging__right">
        <div class="paging__page-limit">
          <span>Số bản ghi/trang</span>
          <base-combobox
            :config="comboboxConfig"
            :parent="showTable.rzPage"
          ></base-combobox>
        </div>
        <div class="paging__page-range">
          <span class="fw-600">{{ showTable.config.pageNumber }}&nbsp;</span
          >-<span class="fw-600"
            >&nbsp;{{ showTable.data.TotalPage }}&nbsp;</span
          >bản ghi
        </div>
        <div class="paging__page-button">
          <button
            class="btn--prev"
            v-if="this.showTable.config.pageNumber == 1"
          >
            <i class="icon-24 icon-pre--light"></i>
          </button>
          <button class="btn--prev cs-pointer" @click="prePage" v-else>
            <i class="icon-24 icon-pre--bold"></i>
          </button>
          <button
            class="btn--next"
            v-if="
              this.showTable.config.pageNumber == this.showTable.data.TotalPage
            "
          >
            <i class="icon-24 icon-next--light"></i>
          </button>
          <button class="btn--next cs-pointer" @click="nextPage" v-else>
            <i class="icon-24 icon-next--bold"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { handleTable } from "@/js/components/table";
import Base from "../js/base.js";
import BaseCombobox from "./combobox/BaseCombobox.vue";
import ToggleButton from "@/components/buttons/ToggleButton.vue";
import ButtonCombobox from "./combobox/ButtonCombobox.vue";
import OptionTooltip from "./tooltip/OptionTooltip.vue";
import TABLE_ATTRIBUTE from "@/i18n/tableAtribute";
import { useEmployeeState } from "@/stores/employee/employee.js";
import { useEmployeeDetailState } from "@/stores/employeeForm/employeeDetail";
export default {
  name: "BaseTable",
  props: {
    tablePopup: {
      type: Object,
    },
  },
  components: {
    BaseCombobox,
    ButtonCombobox,
    ToggleButton,
    OptionTooltip,
  },
  setup() {
    const ATTRIBUTE = TABLE_ATTRIBUTE;
    const employeeState = useEmployeeState();
    const employeeDetailState = useEmployeeDetailState();
    return { ATTRIBUTE, employeeState, employeeDetailState };
  },
  data() {
    return {
      showTable: {
        config: {
          pageNumber: 1,
          pageSize: 10,
          employeeFilter: "",
          departmentId: "",
          positionId: "",
          header: {
            method: "get",
          },
        },
        rzPage: {
          resize: null,
          loadData: null,
        },
        data: {},
        errors: [],
        display: {
          tableBody: "",
          numberOfPage: 0,
        },
      },
      hoverReload: false,
      base: new Base(),
      column: null,
      numberOfColumn: 17,
      comboboxConfig: {
        id: "paging",
        name: "paging",
        inputType: "text",
        objectName: "Department",
        disabled: "",
        options: [10, 25, 50, 100],
        optionClass: "combobox__option max-height-200 combobox__option-paging",
        width: "72px",
      },
      functionComboboxConfig: {
        id: "test",
        name: "test",
        inputType: "submit",
        buttonLeft: {
          title: "Sửa",
        },
        objectName: "Department",
        disabled: null,
        options: ["Nhân bản", "Xóa", "Ngưng sử dụng"],
        optionClass: "combobox__option",
        width: "72px",
      },
      optionTooltip: {
        options: [
          { key: "Nhân bản", value: 1 },
          { key: "Xóa", value: 2 },
          { key: "Ngưng sử dụng", value: 3 },
        ],
        position: {},
        isShow: false,
      },
      action: {
        selected: null,
        object: {},
        position: null,
      },
    };
  },
  methods: {
    checkAll: function () {},
    /**
     * Làm mới trang
     * Author: MDLONG(30/10/2022)
     */
    refreshPage: function () {
      let config = this.showTable.config;
      config.pageSize = 10;
      config.pageNumber = 1;
      this.loadData();
    },

    /**
     * Lấy dữ liệu từ API
     * Author: MDLONG(30/10/2022)
     */
    loadData: async function () {
      let config = this.showTable.config;
      this.showTable.data = await this.employeeState.fetchFilters(
        config.pageSize,
        config.pageNumber,
        config.employeeFilter,
        config.departmentId,
        config.positionId
      );
      // console.log(1);
      this.sortColumn(this.showTable.data.Data[0]);
      console.log(this.column);
      console.log(this.showTable.data);
    },

    /**
     * Trang kế tiếp
     * Author: MDLONG(30/10/2022)
     */
    nextPage: function () {
      if (this.showTable.config.pageNumber < this.showTable.data.TotalPage) {
        this.showTable.config.pageNumber += 1;
        this.loadData();
      }
    },

    /**
     * Trang trước
     * Author: MDLONG(30/10/2022)
     */
    prePage: function () {
      if (this.showTable.config.pageNumber > 0) {
        this.showTable.config.pageNumber -= 1;
        this.loadData();
      }
    },

    /**
     * chọn lại số lượng bản ghi
     * Author: MDLONG(30/10/2022)
     */
    resizePage(newSize) {
      this.showTable.config.pageSize = newSize;
    },

    /**
     * Thay đổi kích thước trang
     * Author: MDLONG(30/10/2022)
     */
    loadNewSize() {
      this.showTable.rzPage.resize = this.resizePage;
      this.showTable.rzPage.loadData = this.loadData;
    },

    /**
     * Đặt thứ tự cột
     * Author: MDLONG(30/10/2022)
     * @param {object} object
     */
    sortColumn: function (object) {
      let columnOrder = {};
      //lấy ra những trường cần và gán thứ tự
      Object.keys(object).forEach((key) => {
        switch (key) {
          // case 'EmployeeId':
          // case 'ModifiedDate':
          // case 'CreatedDate':
          //     break
          case "DateOfBirth":
            columnOrder[4] = key;
            break;
          case "EmployeeCode":
            columnOrder[1] = key;
            break;
          case "EmployeeName":
            columnOrder[2] = key;
            break;
          case "DepartmentName":
            columnOrder[9] = key;
            break;
          case "GenderName":
            columnOrder[3] = key;
            break;
          case "IdentityNumber":
            columnOrder[5] = key;
            break;
          case "IdentityDate":
            columnOrder[6] = key;
            break;
          case "IdentityPlace":
            columnOrder[7] = key;
            break;
          case "Address":
            columnOrder[13] = key;
            break;
          case "PhoneNumber":
            columnOrder[14] = key;
            break;
          case "TelephoneNumber":
            columnOrder[15] = key;
            break;
          case "Email":
            columnOrder[16] = key;
            break;
          case "BankAccountNumber":
            columnOrder[10] = key;
            break;
          case "BankName":
            columnOrder[11] = key;
            break;
          case "BankBranchName":
            columnOrder[12] = key;
            break;
          case "Salary":
            columnOrder[17] = key;
            break;
          case "EmployeePosition":
            columnOrder[8] = key;
            break;
          default:
        }
      });
      this.column = columnOrder;
      //duyệt kết quả đó trả ra mảng kết quả
    },

    /**
     * Hiện popup
     * Author MDLONG(30/10/2022)
     * @param {event} e
     */
    showPopupTable: function (e) {
      let popup = this.$props.tablePopup;
      popup.status = true;
      popup.object = this.$data.showTable.data[e.target.id];
    },

    /**
     * render table
     * Author: MDLONG(30/10/2022)
     */
    doSearch: function (e) {
      clearTimeout(this.delayTimer);
      this.showTable.config.employeeFilter = e.currentTarget.value;
      this.delayTimer = setTimeout(() => {
        this.loadData();
      }, 1000);
    },

    /**
     * Lọc giá trị falsy
     * Author: MDLONG(06/11/2022)
     * @param {*} value
     */
    filterFalsy: function (value) {
      return Base.filterFalsy(value);
    },

    filterDate: function (value) {
      return Base.formatDate(value);
    },

    /**
     * Hover nút reload
     * Author: MDLONG(30/10/2022)
     */
    onHoverReload: function () {
      this.hoverReload = !this.hoverReload;
    },
    /**
     * Lấy hành động được chọn
     * Author: MDLONG(06/11/2022)
     * @param {*} value
     */
    getRowAction: function (value) {
      this.action.object.id = value.object.id;
      // this.action.position = value.position;
      this.optionTooltip.position = value.position;
      this.optionTooltip.isShow = !this.optionTooltip.isShow;
      console.log("getRow: ", value);
    },
    /**
     * Thực hiện hành động được chọn
     * Author: MDLONG(06/11/2022)
     * @param {*} value
     */
    doRowAction: function (value) {
      switch (+value) {
        case 1:
          console.log("nhân bản");
          break;
        case 2:
          this.deleteObject();
          break;
        case 3:
          console.log("Ngưng sử dụng");
          break;
      }
    },
    /**
     * Xóa đối tượng ở hàng được chọn
     * Author: MDLONG(06/11/2022)
     */
    // deleteObject: function () {
    //   let api = `${this.tableAttr.api}Employees/${this.action.object.id}`;
    //   // let that = this;
    //   var statusCode = null;
    //   fetch(api, {
    //     method: "DELETE",
    //     headers: { "Content-Type": "application/json" },
    //   })
    //     .then((response) => {
    //       statusCode = response.status;
    //       return response.json();
    //     })
    //     .then((json) => {
    //       switch (statusCode) {
    //         case 400:
    //           showDialog({
    //             message: {
    //               header: "Lỗi",
    //               body: json.userMsg || 'Xóa thất bại',
    //             },
    //             button: {
    //               pri: {
    //                 label: "Đóng",
    //                 onClick: () => {
    //                   document.querySelector(".dialog").style.display = "none";
    //                 },
    //               },
    //             },
    //           });
    //           break;
    //         case 200:
    //           showDialog({
    //             message: {
    //               header: "Thành công",
    //               body: "Xóa thành công",
    //             },
    //             button: {
    //               pri: {
    //                 label: "Đóng",
    //                 onClick: () => {
    //                   document.querySelector(".dialog").style.display = "none";
    //                 },
    //               },
    //             },
    //           });
    //           break;
    //       }
    //     })
    //     .then(() => {
    //       // hidePopup();
    //     })
    //     .then(()=>{
    //       this.loadData();
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //       showDialog({
    //         message: {
    //           header: "Lỗi",
    //           body: "Xóa thất bại",
    //         },
    //         button: {
    //           pri: {
    //             label: "Đóng",
    //             onClick: () => {
    //               document.querySelector(".dialog").style.display = "none";
    //             },
    //           },
    //         },
    //       });
    //     });

    // },

    doHideOption: function (value) {
      console.log(value);
      this.optionTooltip.isShow = value;
    },
    hideOptionFunction: function (e) {
      console.log(e.target.classList.contains("action-button"));
      if (!e.target.classList.contains("action-button")) {
        this.optionTooltip.isShow = false;
      }
    },
  },
  created() {
    this.loadData();
  },
  updated(){

  },
  mounted() {
    this.loadNewSize();
    window.addEventListener("click", this.hideOptionFunction);
  },
  unmount() {
    // window.removeEventListener("click", this.hideOptionList);
  },
};
</script>

<style></style>
