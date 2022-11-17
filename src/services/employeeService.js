import * as request from '@/utils/request'
/*eslint-disable*/
/**
 * Lấy nhân viên từ api theo filter
 * Author: MDLONG(16/11/2022)
 * @param {Integer} pageSize 
 * @param {Integer} pageNumber 
 * @param {string} employeeFilter 
 * @param {guid} departmentId 
 * @param {guid} positionId 
 * @returns 
 */
export const filters = async (pageSize, pageNumber, employeeFilter, departmentId) => {
    try {
        const res = await request.get('employees/filter', {
            params: {
                pageSize,
                pageNumber,
                employeeFilter,
                departmentId,
            }
        })
        return res
    } catch (error) {
        console.log(error)
    }
}

export const addEmployee = async (employee) => {
    try {
        const res = await request.post('employees', {
            employee: employee
        })
        console.log(res)
        return res
    } catch (error) {
        console.log(error)
    }

}

export const editEmployee = async (employee) => {
    try {
        const res = await request.put('employees', {
            params:{
                employeeId:employee.employeeId
            },
            employee: employee
        })
        return res
    } catch (error) {
        console.log(error)
    }

}