$(function () {
  let form = layui.form
  let layer = layui.layer

  form.verify({
    //自定义了一个规则
    pwd: [
      /^[\S]{6,12}$/
      , '密码必须6到12位，且不能出现空格'
    ],
    repwd: function (value) {
      let pwd = $('.layui-form [name=newPwd]').val()
      if (pwd !== value) return '两次密码不一致!'
    }
  })


  $('#btnReset').on('click', function (e) {
    //阻止表单的默认重置行为
    e.preventDefault()

  })

  // 监听表单的提交事件
  $('.layui-form').on('submit', function (e) {
    e.preventDefault()
    $.ajax({
      method: 'post',
      url: '/my/updatepwd',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('更新密码失败')
        }
        layer.msg('更新密码成功')
        $('.layui-form')[0].reset()
        // localStorage.removeItem('token')
        // //跳转到登录页
        // location.href = '/大事件项目/个人练习/login.html'

      }
    })
  })
})
