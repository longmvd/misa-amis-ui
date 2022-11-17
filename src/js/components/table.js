// import Base from "@/js/base"
// import Validator from "@/js/validator"
// import { showPopup } from "./popup.js"

// var employees = []
// // var base = 
// /**
//  * Xử tất cả sự kiện trên table
//  * Author: MDLONG(22/10/2022)
//  */
// export function handleTable(config) {
//     // doCheckAll()
//     dbClickShowPopupTable(config)
//     // clickReloadData(config)
//     tableLoadData(config)
// }
// /* eslint-disable */
// function clickReloadData(config) {
//     document.querySelector('.btn--reload').addEventListener('click', () => { tableLoadData(config) })
// }

// /**
//  * Lấy dữ liệu từ api đổ ra bảng
//  * Author: MDLONG(23/10/2022)
//  * @param {object} config object chứa selector table, api,...
//  */
// function tableLoadData(config) {
//     new Base().loadData({
//         api: 'https://amis.manhnv.net/api/v1/Employees',
//         header: {
//             method: 'get'
//         },
//         process: function (response) {
//             // let tableBody = document.querySelector(config.selector).querySelector('tbody')
//             employees = response

//             // tableBody.innerHtml = response.map((element, index) => {
//             //     return (
//             //         `<tr id="${index}">
//             //             <td class="text-center"><input class="c1 employee-checkbox" type="checkbox" ></td>
//             //             ${sortColumn(element, 18)}
//             //             <td class="text-center">Sửa</td>
//             //         </tr>`
//             //     )
//             // })
//             // console.log(tableBody)
//         },
//         initEvent: function () {
//             dbClickShowPopupTable(config)
//         }
//     })
// }

// /**
//  * 
//  * @param {object} object đối tượng hiển thị trên bảng
//  * @param {integer} colNum số lượng cột
//  * @returns mảng các thẻ html <td></td>
//  */
// function sortColumn(object, colNum) {
//     let columnOrder = {}
//     //lấy ra những trường cần và gán thứ tự
//     Object.keys(object).forEach((key) => {
//         switch (key) {
//             // case 'EmployeeId':
//             // case 'ModifiedDate':
//             // case 'CreatedDate':
//             //     break
//             case "DateOfBirth":
//                 columnOrder[4] = key
//                 break
//             case "EmployeeCode":
//                 columnOrder[1] = key
//                 break
//             case "EmployeeName":
//                 columnOrder[2] = key
//                 break
//             case "DepartmentName":
//                 columnOrder[9] = key
//                 break
//             case "GenderName":
//                 columnOrder[3] = key
//                 break
//             case "IdentityNumber":
//                 columnOrder[5] = key
//                 break
//             case "IdentityDate":
//                 columnOrder[6] = key
//                 break
//             case "IdentityPlace":
//                 columnOrder[7] = key
//                 break
//             case "Address":
//                 columnOrder[13] = key
//                 break
//             case "PhoneNumber":
//                 columnOrder[14] = key
//                 break
//             case "TelephoneNumber":
//                 columnOrder[15] = key
//                 break
//             case "Email":
//                 columnOrder[16] = key
//                 break
//             case "BankAccountNumber":
//                 columnOrder[10] = key
//                 break
//             case "BankName":
//                 columnOrder[11] = key
//                 break
//             case "BankBranchName":
//                 columnOrder[12] = key
//                 break
//             case "Salary":
//                 columnOrder[17] = key
//                 break
//             case "EmployeePosition":
//                 columnOrder[8] = key
//                 break
//             default:

//         }

//     })
//     //duyệt kết quả đó trả ra mảng kết quả
//     let ans = []
//     for (let index = 1; index < colNum; index++) {
//         const key = columnOrder[index]
//         let html
//         let value = object[key]
//         if (key.toLowerCase().includes('date'))
//             html = `<td ${key} >${Base.formatDate(new Date(value))}</td>`
//         else
//             html = `<td ${key} >${Base.filterFalsy(value)}</td>`
//         ans.push(html)
//     }
//     return ans
// }

// /**
//  * Hiển thị popup nhân viên khi double click vào hàng
//  * Author:MDLONG(23/10/2022)
//  */
// export function dbClickShowPopupTable(config) {
//     let trs = document.querySelectorAll('tr')
//     Array.from(trs).forEach((element) => {
//         element.addEventListener('dblclick', handleShowPopupTable(config))
//     })
// }

// /**
//  * Xử lý hiện popup, set giá trị mặc định và sự kiện submit để sửa thông tin
//  * @param {Validator} validator class Validator
//  * @returns function xử lý hiện popup
//  */
// function handleShowPopupTable(config) {
//     return function showPopupTable(event) {
//         let index = Base.getParents(event.target, 'tr').getAttribute('id')
//         let employee = employees[index]
//         let defaults = [
//             // Validator.defaultValue('input[name="employee-gender"]', 1)
//         ]

//         // console.log(employee)
//         showPopup()
//         Object.entries(employee).forEach(([key, value]) => {
//             let selector = `input[name="${key.toLocaleLowerCase()}"]`
//             let input = document.querySelector(`input[name="${key.toLocaleLowerCase()}"]`)
//             if (input) {
//                 // input.value = value
//                 defaults.push(Validator.defaultValue(selector, value))
//             }

//         })
//         // let validator = new Validator({
//         //     form:"#employee-form"
//         // })
//         config.employeeId = employee.EmployeeId
//         config.validator.setDefaults(defaults)
//         config.validator.setOnSubmit(handleUpdateEmployee(config))
//         config.validator.setDefaultInput()
//     }
// }

// /**
//  * Xử lý update thông tin nhân viên
//  * @param {string} employeeId khóa chính nhân viên
//  * @returns function gửi data lên server để update
//  */
// function handleUpdateEmployee(config) {
//     return function updateEmployee(value) {
//         var data = { ...value }
//         var statusCode = null
//         fetch('https://amis.manhnv.net/api/v1/employees/' + config.employeeId, {
//             method: 'PUT',

//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(data),
//         })
//             .then(response => {
//                 statusCode = response.status
//                 return response.json()
//             })
//             .then(json => {
//                 console.log(json)
//                 switch (statusCode) {
//                     case 400:
//                         config.showDialog({
//                             message: {
//                                 header: "Lỗi",
//                                 body: json.userMsg
//                             },
//                             button: {
//                                 pri: {
//                                     label: "Đóng",
//                                     onClick: () => {
//                                         document.querySelector(".dialog").style.display = 'none'
//                                     }
//                                 }
//                             }
//                         })
//                         break;
//                     case 200:
//                         config.showDialog({
//                             message: {
//                                 header: "Thành công",
//                                 body: 'Sửa thành công'
//                             },
//                             button: {
//                                 pri: {
//                                     label: "Đóng",
//                                     onClick: () => {
//                                         document.querySelector(".dialog").style.display = 'none'
//                                     }
//                                 }
//                             }
//                         })
//                         break
//                 }
//             })
//             .then(() => { config.hidePopup() })
//             .catch(err => {
//                 console.log(err)
//                 config.showDialog({
//                     message: {
//                         header: "Lỗi",
//                         body: "Cập nhật thông tin thất bại"
//                     },
//                     button: {
//                         pri: {
//                             label: "Đóng",
//                             onClick: () => {
//                                 document.querySelector(".dialog").style.display = 'none'
//                             }
//                         }
//                     }
//                 })
//             })
//     }

// }


// /**
//  * Check/uncheck tất cả checkbox trong bảng khi check/uncheck nút check all
//  * Author: MDLONG(22/10/2022)
//  */
// function doCheckAll() {
//     document.querySelector('#table-checkall').addEventListener('change', checkAll)
// }


// /**
//  * Check tất cả checkbox
//  * Author: MDLONG(22/10/2022)
//  */
// function checkAll(event) {
//     if (event.target.checked) {
//         document.querySelectorAll('.employee-checkbox').checked = true;
//     } else {
//         document.querySelector('.employee-checkbox').checked = false;
//     }
// }

// // "FirstName"
// // "LastName"
// // "Gender"
// // "JoinDate"
// // "MartialStatus"
// // "EducationalBackground"
// // "QualificationId"
// // "DepartmentId"
// // "PositionId"
// // "WorkStatus"
// // "PersonalTaxCode"
// // "PositionCode"
// // "DepartmentCode"
// // "QualificationName"
// // "EducationalBackgroundName"
// // "MartialStatusName"
// // "CreatedDate"
// // "CreatedBy"
// // "ModifiedDate"
// // "ModifiedBy"

// //         // case: "EmployeeCode":
// //         // case: "EmployeeName":
// //         // case: "DepartmentName":
// //         // case: "PositionName":
// //         // case: "DateOfBirth":
// //         // case: "GenderName":
// //         // case: "IdentityNumber":
// //         // case: "IdentityDate":
// //         // case: "IdentityPlace":
// //         // case: "Address":
// //         // case: "PhoneNumber":
// //         // case: "TelephoneNumber":
// //         // case: "Email":
// //         // case: "BankAccountNumber":
// //         // case: "BankName":
// //         // case: "BankBranchName":
// //         // case: "Salary":
// //         // case: "EmployeePosition":