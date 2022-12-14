$(function () {
  const layer = layui.layer

  //调用getUserinfo 获取用户基本信息
  getUserinfo()

  $('#btnLogout').on('click', function () {
    // 提示用户是否确认退出
    layer.confirm(
      '确定退出登录?',
      { icon: 3, title: '提示' },
      function (index) {
        //do something
        //清空本地存储的token
        localStorage.removeItem('token')
        //重新跳转到登录页面
        location.href = 'http://127.0.0.1:5500/home/login.html'
        // 关闭询问框
        layer.close(index)
      }
    )
  })
})

// 获取用户的基本信息
function getUserinfo() {
  $.ajax({
    method: 'GET',
    url: 'http://127.0.0.1:5500/my/userinfo',
    // headers 就是请求头配置对象
    // headers: {
    //   Authorization: localStorage.getItem('token')
    // },
    success: function (res) {
      console.log(res)
      if (res.status !== 0) {
        return layer.msg('获取用户信息失败')
      }
      // 调用renderAvatar 渲染用户头像
      renderAvatar(res.data)
    }
    //不论成功还是失败，最终都会调用complete 回调函数
    // complete: function (res) {
    //   // console.log(res.responseJSON)
    //   if (
    //     res.responseJSON.status === 1 &&
    //     res.responseJSON.message === '身份认证失败'
    //   ) {
    //     localStorage.removeItem('token')
    //     location.href = 'http://127.0.0.1:5500/home/login.html'
    //   }
    // }
  })
}
// 渲染用户的头像
function renderAvatar(user) {
  console.log(user)
  //获取用户的名称，如果有昵称用昵称，否则使用用户名
  const name = user.nickname || user.username
  //设置欢迎文本
  $('#welcome').html('欢迎  ' + name)
  // 按需渲染用户头像
  if (user.user_pic !== null) {
    // 渲染图片头像

    $('.layui-nav-img').attr('src', user.user_pic).show()
    $('.text-avatar').hide()
  } else {
    // 渲染文本头像
    $('.layui-nav-img').hide()
    const first = name[0].toUpperCase()
    $('.text-avatar').html(first).show()
  }
}
