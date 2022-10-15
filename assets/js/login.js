$(function () {
  // 点击”去注册账号的链接“
  $('#link_reg').on('click', function () {
    $('.login-box').hide()
    $('.reg-box').show()
  })

  // 点击”去登陆“的链接
  $('#link_login').on('click', function () {
    $('.reg-box').hide()
    $('.login-box').show()
  })

  //从layui中获取form对象
  let form = layui.form
  let layer = layui.layer
  // 通过 FileSystemDirectoryEntry.cerify() 函数自定义校验规则
  form.verify({
    //自定义了一个规则
    pwd: [
      /^[\S]{6,12}$/
      , '密码必须6到12位，且不能出现空格'
    ],
    repwd: function (value) {
      let pwd = $('.reg-box [name=password]').val()
      if (pwd !== value) return '两次密码不一致!'
    }
  })
  // 监听注册表单的提交事件
  // $('#form_reg').on('submit', function (e) {
  //   e.preventDefault();

  //   const data = JSON.stringify({
  //     username: $('#form_reg [name = username]').val(),
  //     password: $('#form_reg [name = password]').val(),
  //     // repassword: $('#form_reg [name = repassword]').val()
  //   });
  //   let xhr = new XMLHttpRequest();
  //   // 设置属性
  //   xhr.open('post', 'http://big-event-api-t.itheima.net/api/reguser');
  //   // 如果想要使用post提交数据,必须添加此行
  //   xhr.setRequestHeader("Content-Type", "application/json");
  //   // 将数据通过send方法传递
  //   xhr.send(data);
  //   // 发送并接受返回值
  //   xhr.onreadystatechange = function () {
  //     // 这步为判断服务器是否正确响应
  //     if (xhr.readyState == 4 && xhr.status == 200) {
  //       layer.msg(JSON.parse(xhr.responseText).message);
  //       $('#link_login').click()
  //     } else {
  //       layer.msg(JSON.parse(xhr.responseText).message);
  //     }
  //   };
  // })
  $('#form_reg').on('submit', function(e) {
    // 1. 阻止默认的提交行为
    e.preventDefault()
    // 2. 发起Ajax的POST请求
    var data = {
      username: $('#form_reg [name=username]').val(),
      password: $('#form_reg [name=password]').val()
    }
    $.post('/api/reguser', data, function(res) {
      if (res.status !== 0) {
        return layer.msg(res.message)
      }
      layer.msg('注册成功，请登录！')
      // 模拟人的点击行为
      $('#link_login').click()
    })
  })
  //监听登陆表单事件
  $('#form_login').submit(function(e) {
    // 阻止默认提交行为
    e.preventDefault()
    $.ajax({
      url: '/api/login',
      method: 'POST',
      // 快速获取表单中的数据
      data: $(this).serialize(),
      success: function(res) {
        if (res.status !== 0) {
          return layer.msg('登录失败！')
        }
        layer.msg('登录成功！')
        // 将登录成功得到的 token 字符串，保存到 localStorage 中
        localStorage.setItem('token', res.token)
        // 跳转到后台主页
        location.href = '/大事件项目/个人练习/index.html'
      }
    })
  })
})