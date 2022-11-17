/**
 * Khởi tạo sự kiện cho dialog
 * Author: MDLONG(24/10/2022)
 */
export function initDialogEvent(){
    clickCloseDialog()
}


/**
 * Đóng dialog khi click
 * Author: MDLONG(24/10/2022)
 */
function clickCloseDialog() {
    document.querySelector('.dialog__close').addEventListener('click', closeDialog)
}

/**
 * Đóng dialog
 * Author: MDLONG(24/10/2022)
 */
function closeDialog(){
    document.querySelector('.dialog').style.display = 'none'
}

/**
 * Hiển thị dialog và khởi tạo sự kiện cho dialog
 * Author: MDLONG(24/10/2022)
 * @param {object} setting tiêu đề và nội dung thông báo
 */
export function showDialog(setting){
    if(setting.message.header){
        // console.log(document.querySelector('.dialog__header'))
        document.querySelector('.dialog__header').innerText = setting.message.header
    }
    if(setting.message.header){
        document.querySelector('.dialog__body').innerText = setting.message.body
    }
    if(setting.button){
        Object.entries(setting.button).forEach(([key, value])=>{
            let button = document.querySelector(`.dialog__footer .btn--${key}`)
            // console.log(button)
            if(key){
                button.style.display = 'block'
                if(value.label){
                    button.innerText = value.label
                }
                if(typeof value.onClick === 'function'){
                    button.addEventListener('click', value.onClick)
                }
            }
        })
    }
    document.querySelector('.dialog').style.display = 'flex'
}