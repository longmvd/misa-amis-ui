export default class Validator {
    constructor(options) {
        this.options = options
        this.formElement = document.querySelector(this.options.form)
        this.buttonSubmit = document.querySelector(this.options.buttonSubmit)
        this.selectorRules = {}
        this.selectorDefaultValues = {}
    }

    /**
     * setter gán hàm submit
     * Author: MDLONG(24/10/2022)
     * @param {function} onSubmit hàm xử lý submit
     */
    setOnSubmit(onSubmit) {
        this.options.onSubmit = onSubmit
    }

    /**
     * setter 
     * Author: MDLONG(24/10/2022)
     * @param {object} defaults các element và giá trị mặc định cần gán cho element đó
     */
    setDefaults(defaults) {
        this.options.defaults = defaults
    }

    /**
    * Đặt giá trị mặc định cho các input
    * Author: MDLONG(22/10/2022)
    */
    setDefaultInput() {
        this.options.defaults.forEach(value => {
            try {
                if (this.formElement) {
                    var inputElements = this.formElement.querySelectorAll(value.selector)
                    Array.from(inputElements).forEach((inputElement) => {
                        switch (inputElement.type) {
                            //nếu radio thì duyệt rồi set giá trị
                            case 'radio':
                                if (inputElement.value == value.getValue()) {
                                    inputElement.checked = true
                                }
                                break
                            //nếu là input thì set luôn giá trị mặc định
                            default:
                                inputElement.value = value.getValue();
                        }


                    })
                } else {
                    console.error('form is undefined')
                }

            } catch (error) {
                console.error(error);
            }
        });
    }

    /**
     * Thực thi validate
     * Author: MDLONG(22/10/2022)
     */
    execute() {

        /**
         * Xóa message lỗi khi đã validate
         * @param {element} errorElement 
         * @param {element} inputElement 
         */
        const removeErrorMessage = (errorElement, inputElement) => {
            errorElement.innerText = ''
            getParentElement(inputElement, this.options.formGroupSelector).classList.remove('error')
        }

        /**
         *Lấy ra element cha
         *Author: MDLONG(22/10/2022) 
         * @param {*} element 
         * @param {*} selector 
         * @returns element
         */
        const getParentElement = (element, selector) => {
            // eslint-disable-next-line
            try{
                if (element)
                    while (element.parentElement) {
                        if (element.parentElement.matches(selector)) {
                            return element.parentElement
                        }
                        element = element.parentElement
                    }
                else
                    console.error("element is null")
            }catch(error){
                console.error(error)
            }
        }

        /**
         * validate các trường input theo rule 
         *Author: MDLONG(22/10/2022) 
         * @param {element} inputElement 
         * @param {object} rule 
         * @param {element} errorElement 
         * @returns boolean
         */
        const validate = (inputElement, rule, errorElement) => {
            var errorMessage
            var rules = this.selectorRules[rule.selector]
            for (let test of rules) {
                switch (inputElement.type) {
                    case 'checkbox':
                    case 'radio':
                        errorMessage = test(this.formElement.querySelector(rule.selector + ':checked'))
                        break
                    default:
                        errorMessage = test(inputElement.value)
                }
                if (errorMessage)
                    break

            }
            if (errorMessage) {
                errorElement.innerText = errorMessage
                getParentElement(inputElement, this.options.formGroupSelector).classList.add('error')
            }
            else {
                removeErrorMessage(errorElement, inputElement)
            }
            return !errorMessage
        }


        if (this.formElement) {
            /**
             * submit khi là form
             * Author: MDLONG(22/10/2022)
             * @param {event} e 
             */
            const submitByForm = (e) => {
                e.preventDefault()
                submitForm()
            }
            /**
             * submit khi là button và không được bọc bởi form
             * Author: MDLONG(22/10/2022)
             */
            const submitByButton = () => {
                submitForm()
            }

            /**
             * Gửi form đến api
             * Author: MDLONG(22/10/2022)
             */
            const submitForm = () => {
                try{
                    var formIsValid = true
                    this.options.rules.forEach(rule => {
                        var inputElement = this.formElement.querySelector(rule.selector)
                        var errorElement = getParentElement(inputElement, this.options.formGroupSelector).querySelector(this.options.errorSelector)
                        var isValid = validate(inputElement, rule, errorElement)
                        if (!isValid) {
                            formIsValid = false
                        }
                    })
                    if (formIsValid) {
                        if (typeof this.options.onSubmit === 'function') {
                            try {
                                var enableInputs = this.formElement.querySelectorAll('[name]')
                                var formValues = Array.from(enableInputs).reduce((values, input) => {
                                    switch (input.type) {
                                        case 'checkbox':
                                            if (!values[input.name]) {
                                                values[input.name] = []
                                            }
                                            if (input.matches(':checked')) {
                                                values[input.name].push(input.value)
                                            }
                                            break
                                        case 'radio':
                                            if (input.matches(':checked'))
                                                // values[input.name] = this.formElement.querySelector('input[name="'+ input.name +'"]:checked').value
                                                values[input.name] = input.value
                                            break
                                        case 'file':
                                            values[input.name] = input.files
                                            break
                                        default:
                                            values[input.name] = input.value
                                    }
                                    return values
                                }, {})
                                this.options.onSubmit(formValues)
                            } catch (error) {
                                console.error(error)
                            }
                        }
                    }

                }catch(error){
                    console.error(error)
                    
                }
            }

            if (this.formElement.localName == 'form') {
                this.formElement.onsubmit = submitByForm
            }
            else {
                if (this.buttonSubmit) {
                    this.buttonSubmit.onclick = submitByButton
                }
            }
            //lưu lại danh sách các rule của từng element
            this.options.rules.forEach(rule => {
                var inputElements = this.formElement.querySelectorAll(rule.selector)

                if (Array.isArray(this.selectorRules[rule.selector])) {
                    this.selectorRules[rule.selector].push(rule.test)
                } else {
                    this.selectorRules[rule.selector] = [rule.test]
                }

                Array.from(inputElements).forEach((inputElement) => {
                    //lấy ra element hiển thị message lỗi                  
                    let errorElement = getParentElement(inputElement, this.options.formGroupSelector).querySelector(this.options.errorSelector)

                    if (inputElement) {
                        inputElement.onblur = () => {
                            validate(inputElement, rule, errorElement)
                        }
                        inputElement.oninput = () => {
                            removeErrorMessage(errorElement, inputElement)
                        }
                        inputElement.onchange = () => {
                            validate(inputElement, rule, errorElement)
                        }
                    }

                })

            });

            //gán giá trị mặc định cho input element
            if (this.options.defaults) {
                this.setDefaultInput()
            }

        }
    }

    /**
     * Trả selector của element và hàm xử lý
     * Author: MDLONG(22/10/2022)
     * @param {string} selector 
     * @param {string} message 
     * @returns object 
     */
    static isRequire(selector, message) {
        return {
            selector,
            /**
             * Trả về text mesages lỗi của element khi lỗi để trống, nếu không lỗi return undefined
             * Author: MDLONG(22/10/2022)
             * @param {*} value 
             * @returns 
             */
            test: function (value) {
                return (typeof value === 'string' ? value = value.trim() : value) ? undefined : message || 'Không để trống'
            }
        }
    }

    /**
    * Trả selector của element và text mesages lỗi của element với lỗi sai email
    * Author: MDLONG(22/10/2022)
    * @param {string} selector 
    * @param {string} message 
    * @returns object 
    */
    static isEmail(selector, message) {
        return {
            selector,
            test: function (value) {
                if (value) {
                    /* eslint-disable no-useless-escape */
                    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
                    return regex.test(value) ? undefined : message || 'Vui lòng nhập email'
                }
            }
        }
    }

    /**
    * Trả selector của element và text mesages lỗi của element với lỗi sai số điện thoại
    * Author: MDLONG(22/10/2022)
    * @param {string} selector 
    * @param {string} message 
    * @returns object 
    */
    static isPhone(selector, message) {
        return {
            selector,
            test: function (value) {
                if (value) {
                    const regex = /^[0-9]{10}$/
                    return regex.test(value) ? undefined : message || 'Vui lòng nhập số điện thoại'
                }
            }
        }
    }

    /**
     * Trả selector của element và text mesages lỗi của element với lỗi số lượng ký tự
     * Author: MDLONG(22/10/2022)
     * @param {string} selector 
     * @param {integer} min
     * @param {string} message 
     * @returns object 
     */
    static minLength(selector, min, message) {
        return {
            selector,
            /**
             * trả về text mesages lỗi của element khi lỗi chưa đủ ký tự, nếu không lỗi return undefined
             * Author: MDLONG(22/10/2022)
             * @param {*} value 
             * @returns 
             */
            test: function (value) {
                if (value)
                    //nếu không truyền message thì lấy mặc định là `Vui lòng....`
                    return value.length >= min ? undefined : message || `Vui lòng nhập tối thiểu ${min} ký tự`
            }
        }
    }

    /**
     * Trả selector của element và hàm xử lý 
     * Author: MDLONG(22/10/2022)
     * @param {string} selector 
     * @param {function} getConfirm
     * @param {string} message 
     * @returns object 
     */
    static isConfirmed(selector, getConfirm, message) {
        return {
            selector,
            //trả về text mesages lỗi của element khi lỗi mật khẩu xác nhận không khớp nếu không lỗi return undefined
            test: function (value) {
                return value === getConfirm() ? undefined : message || 'Giá trị nhập vào không khớp'
            }
        }
    }

    /**
     * Trả selector của element và hàm xử lý
     * Author:MDLONG(22/10/2022)
     * @param {element} selector 
     * @param {*} defaultValue 
     * @returns 
     */
    static defaultValue(selector, defaultValue) {
        return {
            selector,
            getValue: function () {
                //nếu là string thì trim, là falsy != 0 thì trả về '', ===0 thì trả về 0
                return typeof defaultValue === 'string' ? defaultValue = defaultValue.trim() : defaultValue === 0 ? 0 : defaultValue || ''
            }
        }
    }
}