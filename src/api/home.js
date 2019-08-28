import axios from '@/assets/js/axiosConfig';
import baseURL from '@/assets/js/config';

/** detail 路由 */
// 获取 search 数据
export const getDetail = () => {
    return axios.get(`${baseURL}/search`)
}
/** detail 路由 */

/** tab 切换中的推荐项 */
export const recommend_sildershow = () => {
    return axios.get(`${baseURL}/recommend`)
}
/** tab 切换中的推荐项 */

/** tab 切换中的手机项 */
export const mobel_sildershow = () => {
    return axios.get(`${baseURL}/mobel`)
}
/** tab 切换中的手机项 */

/** detail 详情中的请求 */
export const detail_post = (params) => {
    return axios.post(`${baseURL}/detail`,params)
}
/** detail 详情中的请求 */
