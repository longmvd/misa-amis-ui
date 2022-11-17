import { hidePopup, showPopup } from "./components/popup.js"
import { handleEnlargeSidebar, handleMinimizeSidebar } from "./components/sidebar.js"
// import { handleTable } from "./components/table.js"
// import { handleTooltip } from "./components/tooltip.js"
import Validator from "./validator.js"
// import Base from './base.js'
// import { initComboboxEvent } from "./components/combobox.js"
import { initDialogEvent, showDialog } from "./components/dialog.js"
export var validator
// var config = {
//     host:'https://amis.manhnv.net',
//     api: {
//         employee: 'api/v1/Employees/NewEmployeeCode/',
//         department: '/api/v1/Departments/',
//         position: '/api/v1/Positions/'
//     },
//     validator
// }
/**
 * khởi tạo event khi load trang
 */


/** 
 * khởi tạo event
 * Author: MDLONG(20/10/2022)
*/
export default function initEvent() {
    closePopupOnClick()
    openPopupOnClick()
    initSidebarEvents()
    initValidator()
    handleSendEmployeeForm()
    //     handleTable({selector:'#employee-table',
    //     validator,
    //     hidePopup,
    //     showPopup,
    //     employeeId: null
    // })
    // initComboboxEvent()
    initDialogEvent()
}
/**
 * Khởi tạo validate
 */
function initValidator() {
    validator = new Validator({
        form: "#employee-form",
        errorSelector: ".err-message",
        formGroupSelector: ".el-wrapper",
        buttonSubmit: "#save-employee",
        rules: [
            Validator.isRequire("#employee-code", "Vui lòng nhập mã nhân viên"),
            Validator.isRequire("#employee-department", "Vui lòng chọn đơn vị"),
            // Validator.isRequire("#employee-email", "Không để trống"),
            Validator.isRequire("#employee-name", "Không để trống"),
            Validator.isEmail("#employee-email", "Vui lòng nhập đúng email"),
            Validator.isPhone("#employee-phone", "Vui lòng nhập đúng số điện thoại"),
            Validator.isPhone("#employee-telephone", "Vui lòng nhập đúng số điện thoại"),
            Validator.minLength("#employee-idcard", 12),
        ],
        defaults: [
            Validator.defaultValue('input[name="gender"]', 1)
        ],
        onSubmit: function (value) {
            var data = { ...value }
            var statusCode = null
            fetch('https://amis.manhnv.net/api/v1/employees', {
                method: 'POST', // or 'PUT'

                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            })
                .then(response => {
                    statusCode = response.status
                    return response.json()
                })
                .then(json => {
                    console.log(json)
                    switch (statusCode) {
                        case 400:
                            showDialog({
                                message: {
                                    header: "Lỗi",
                                    body: json.userMsg
                                },
                                button: {
                                    pri: {
                                        label: "Đóng",
                                        onClick: () => {
                                            document.querySelector(".dialog").style.display = 'none'
                                        }
                                    }
                                }
                            })
                            break
                        case 201:
                        case 200:
                            showDialog({
                                message: {
                                    header: "Thành công",
                                    body: 'Thêm mới thành công'
                                },
                                button: {
                                    pri: {
                                        label: "Đóng",
                                        onClick: () => {
                                            document.querySelector(".dialog").style.display = 'none'
                                        }
                                    }
                                }
                            })
                            break
                    }
                })
                // .then((response) =>{
                //     alert(response)
                // })
                .then(() => { hidePopup() })
                .catch(err => console.log(err))
        },
    })
}

/**
 * Khởi tạo sự kiện sidebar
 * Author: MDLONG(22/10/2022)
 */
function initSidebarEvents() {
    handleMinimizeSidebar()
    handleEnlargeSidebar()
    // handleTooltip()
}


/** 
 * click ẩn popup nhân viên
 * Author: MDLONG(20/10/2022)
*/
function closePopupOnClick() {
    document.querySelector('.popup-close .icon-close').addEventListener('click', hidePopup)
    document.querySelector('.popup-button__left .btn').addEventListener('click', hidePopup)
}

/** 
 * click hiện popup nhân viên
 * Author: MDLONG(20/10/2022)
*/
function openPopupOnClick() {
    document.querySelector('.top-content .btn').addEventListener('click', showPopup)
}

/**
 * validate thông tin nhân viên
 * Author: MDLONG(20/10/2022)
 * @returns boolean
 */
function handleSendEmployeeForm() {
    validator.execute()
}


/**
 * Tìm thẻ cha theo selector
 * @param {element} element
 * @param {string} parentsName
 * @returns element
 */
// function getParents(element, selector) {

//     if (element.parentElement.matches(selector)) {
//         return element.parentElement
//     }
//     return getParents(element.parentElement, selector)
// }
