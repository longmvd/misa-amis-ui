import FORM_MODE from "@/utils/formMode";
import { defineStore } from "pinia";
import * as response from '@/services/employeeService'
/* eslint-disable */

export const useEmployeeDetailState = defineStore({
    id: "employeeDetail",
    state: () => ({
        isShow: false,
        mode: FORM_MODE.ADD,
        selectedEmployee: {},
        data: {},
    }),
    actions: {
        toggleEmployeeDetail() {
            this.isShow = !this.isShow;
        },
        hideEmployeeDetail() {
            this.isShow = false;
        },

        /**
         * Hiển thị form sửa
         * @param {object} employee 
         */
        showEditEmployee(employee) {
            this.mode = FORM_MODE.EDIT
            this.selectedEmployee = employee;
            this.isShow = true;
        },
        /**
         * Hiển thị để thêm
         */
        showAddEmployee() {
            this.mode = FORM_MODE.ADD
            this.isShow = true;
        },

        /**
         * Gọi api gửi dữ liệu lên server
         */
        sendData(){
            switch(this.mode){
                case FORM_MODE.ADD:
                    response.addEmployee(this.selectedEmployee)
                    break;
                case FORM_MODE.EDIT:
                    response.editEmployee(this.selectedEmployee)
                    break;
            }
        },

        /**
         * Chọn nhân viên để sửa
         * Author: MDLONG(17/11/2022)
         * @param {Object} employee 
         */
        selectEmployee(employee) {
            this.selectedEmployee = employee
        },

        /**
         * Thiết lập chế độ cho form
         * Author: MDLONG(17/11/2022)
         */
        setMode(mode){
            this.mode = mode
        }
    },
    getters: {
        getData: (state) => {
            return state.data;
        },
        getStatus: (state) => {
            // eslint-disable-next-line
            
            return state.isShow
        }
    }

})