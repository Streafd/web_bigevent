// 每次调用$.get() 或$.post() 或$.ajax()的时候
//会先调用ajaxPrefilter 这个函数
//在这个函数中，可以拿到我们给AJax提供的配置对象
$.ajaxPrefilter(function (options) {
  //在发起真正的ajax请求之前，统一拼接请求的根路径
  // options.url = 'http://127.0.0.1:5500'+options.url
  if (options.url.indexOf('/my/') !== -1) {
    options.headers = {
      Authorization: localStorage.getItem('token')
    }
  }
  options.complete = (res) => {
    if (
      res.responseJSON.status === 1 &&
      res.responseJSON.message === '身份认证失败'
    ) {
      localStorage.removeItem('token')
      location.href = '/home/login.html'
    }
  }
})
