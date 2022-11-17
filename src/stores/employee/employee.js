
import { defineStore } from "pinia";
import * as request from "@/services/employeeService";
/* eslint-disable */
export const useEmployeeState = defineStore({
    id: "employee",
    state: () => ({
        data: {},
        isCheckedAll: false,
        
        selectedEmployeeIDs:[]
    }),
    actions:{
        /**
         * Lấy nhân viên từ api theo filter
         * Author: MDLONG(17/11/2022)
         * @param {Integer} pageSize 
         * @param {Integer} pageNumber 
         * @param {String} employeeFilter 
         * @param {String} departmentId 
         * @param {String} positionId 
         * @returns 
         */
        async fetchFilters(pageSize=10, pageNumber=1, employeeFilter='', departmentId=''){
            // debugger
            this.data = await request.filters(pageSize, pageNumber, employeeFilter, departmentId)
            return this.data
        },
        /**
         * Check tất cả checkbox
         */
        checkAll(){
            this.isCheckedAll = true
        },
        toggleCheckAll(){
            this.isCheckedAll = !this.isCheckedAll
        },
        /**
         * Thêm id nhân viên vào mảng chọn
         * @param {String} employeeId 
         */
        toggleEmployee(event, employeeId){
            console.log(event.target)
            console.log(employeeId)
            this.selectedEmployeeIDs.push(employeeId);
            if(this.selectedEmployeeIDs.length == this.data.Data.length){
                this.isCheckedAll = true;
            }
        }
        
    },
    getters:{
        getData: (state) => {
            // debugger
            return state.data
        },
        getCheckAll: (state) => {
            return state.selectedEmployeeIDs.length < state.data.Data.length ? false : true
        }
    }

})