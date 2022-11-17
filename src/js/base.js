export default class Base {
    constructor() {

    }

    initEvent() {

    }

    /**
     * Load data từ api sau đó thực hiện process
     * @param {object} config 
     */
    loadData(config) {
        fetch(config.api, config.header)
            .then(response => {
                if (response) {
                    let json = response.json()
                    return json
                }
            })
            .then(result => {
                if (typeof config.process === 'function') {
                    config.process(result)
                } else {
                    console.log(config.process)
                    console.error('callback is not a function')
                }
            })
            .then((result) => {
                if (typeof config.initEvent === 'function') {
                    config.initEvent(result)
                } else {
                    console.log(config.initEvent)
                    console.error('callback is not a function')
                }
            })
            .catch((error) => {
                if (typeof config.initEvent === 'function') {
                    config.handleError(error)
                } else {
                    console.error('callback is not a function')
                }
                console.log('error: ', error)
            });
    }

    /**
     * Định dạng ngày/tháng/năm
     * Author: MDLONG(23/10/2022)
     * @param {Date} date 
     * @returns formatted Date
     */
    static formatDate(stringDate) {
        try {
            let day = new Date(stringDate)
            if (day != 'Invalid Date') {
                let date = day.getDate() > 9 ? day.getDate() : '0' + day.getDate()
                let month = day.getMonth() > 8 ? day.getMonth() + 1 : '0' + (day.getMonth() + 1)
                let year = day.getFullYear()
                return `${date}/${month}/${year}`
            }else{
                return stringDate
            }
        } catch (error) {
            console.log(error)
        }
    }

    /**
     * Tìm thẻ cha theo selector
     * @param {element} element 
     * @param {string} parentsName 
     * @returns element
     */
    static getParents(element, selector) {

        if (element.parentElement.matches(selector)) {
            return element.parentElement
        }
        return this.getParents(element.parentElement, selector)
    }

    /**
     * Lấy giới tính theo mã
     * Author: MDLONG(23/10/2022)
     * @param {integer} genderCode 
     * @returns string gender
     */
    static getGender(genderCode) {
        let gender = ''
        switch (genderCode) {
            case 0:
                gender = 'Nam'
                break
            case 1:
                gender = 'Nữ'
                break
            case 2:
                gender = 'Khác'
                break
        }
        return gender
    }

    /**
     * Không render falsy 
     * Author: MDLONG(23/10/2022)
     * @param {*} value 
     * @returns 
     */
    static filterFalsy(value) {
        return value || ''
    }
}
