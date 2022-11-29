$(function () {
  // 从layui中获取form对象
  const form = layui.form

  // 从layui中获取layer对象
  const layer = layui.layer

  // 通过form.verify() 函数自定义效验规则
  form.verify({
    // 自定义了一个叫 pwd 效验规则
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位,且不能出现空格'],
    repwd: function (value) {
      //获得第一输入密码的值
      const pwd = $('.reg-box [name=password]').val()
      // 判断两次密码输入是否一致
      if (value !== pwd) {
        return '两次密码不一致'
      }
    }
  })

  //监听注册表单的提交事件
  $('#form_reg').on('submit', function (e) {
    // 先阻止默认的提交行为
    e.preventDefault()
    const data = {
      username: $('#form_reg [name=username]').val(),
      password: $('#form_reg [name=password]').val()
    }

    // 在发起ajax 的请求
    $.post('http://127.0.0.1:5500/api/reguser', data, function (res) {
      if (res.status !== 0) {
        // 使用layer.msg()提示消息
        return layer.msg(res.message)
      }
      layer.msg('注册成功')
      // 模拟人的点击行为
      $('#link_login').click()
    })
  })

  // 监听登录表单的提交事件
  $('#form_login').on('submit', function (e) {
    e.preventDefault()
    $.ajax({
      url: 'http://127.0.0.1:5500/api/login',
      method: 'POSt',
      // 快速获取表单中的数据
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message)
        }
        layer.msg('登录成功')
        //将登录成功得到的token 字符串。保存到localStorage中
        // 键值对形式存储在localStorage中
        localStorage.setItem('token', res.token)
        location.href = '/home/index.html'
        // console.log(res)
      }
    })
  })
})
