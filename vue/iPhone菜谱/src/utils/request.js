import axios from 'axios'
var instance = axios.create({
    baseURL:'/api'
})
// 请求拦截器
instance.interceptors.request.use(function (config) {
  // 添加请求默认参数
  config.params.appkey="c671a4c29ec3381b"
  return config;
}, function (error) {
  return Promise.reject(error);
});
// 响应拦截器
instance.interceptors.response.use(function (response) {
  // 对响应数据的默认处理
    return response.data;
  }, function (error) {
    return Promise.reject(error);
  });
export {instance}