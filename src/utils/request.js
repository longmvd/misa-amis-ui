import axios from "axios";
/*eslint-disable*/
const request = axios.create({
    baseURL: 'http://localhost:5200/api/v1/'
})
/**
 * Gọi get api
 * Author: MDLONG(16/11/2022)
 * @param {string} path
 * @param {Object} options
 */
export const get = async (path, options = {}) => {
    const response = await request.get(path, options);
    return response.data;
}

/**
 * Gọi post api
 * Author: MDLONG(16/11/2022)
 * @param {string} path
 * @param {Object} options
 */
export const post = async (path, options = {}) => {
    const response = await request.post(path, options);
    return response.data;
}

/**
 * Gọi put api
 * Author: MDLONG(16/11/2022)
 * @param {string} path
 * @param {Object} options
 */
export const put = async (path, options = {}) => {
    const response = await request.put(path, options);
    return response.data;
}

/**
 * Gọi delete api
 * Author: MDLONG(16/11/2022)
 * @param {string} path
 * @param {Object} options
 */
export const del = async (path, options = {}) => {
    const response = await request.delete(path, options);
    return response.data;
}

export default request;