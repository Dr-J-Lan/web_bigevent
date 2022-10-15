$(function () {
  getUserInfo()
  let layer = layui.layer
  $('#btnLogout').on('click', function () {
    layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {
      //do something
      localStorage.removeItem('token')
      //跳转到登录页
      location.href = '/大事件项目/个人练习/login.html'
      layer.close(index)
    })
  })
})
function getUserInfo() {
  // let xhr = new XMLHttpRequest()
  // console.log(xhr);
  // // 设置属性
  // xhr.open('get', 'http://big-event-vue-api-t.itheima.net/my/userinfo')
  // // 如果想要使用post提交数据,必须添加此行
  // xhr.setRequestHeader('Content-Type', 'application/json')
  // // xhr.setRequestHeader("Content-Type", "application/x-www-form-urlenstatusd");
  // xhr.setRequestHeader('Authorization', localStorage.getItem('token') ? localStorage.getItem('token') : '')
  // // 将数据通过send方法传递
  // xhr.send()
  // // 发送并接受返回值
  // xhr.onreadystatechange = function (res) {
  //     // 这步为判断服务器是否正确响应
  //     if (xhr.status == 200&&xhr.responseText !== '') {
  //         layer.msg(JSON.parse(xhr.responseText).message)
  //         renderAvatar(JSON.parse(xhr.responseText).data)
  //     } else {
  //         layer.msg('请求失败')
  //     }
  //     console.log('执行了回调函数',xhr.responseText?JSON.parse(xhr.responseText):'')
  // }
  $.ajax({
    method: 'GET',
    url: '/my/userinfo',
    success: function (res) {
      console.log(res);
      if (res.status !== 0) {
        return layui.layer.msg('获取用户信息失败！')
      }
      // 调用 renderAvatar 渲染用户的头像
      renderAvatar(res.data)
    },
  })
}

function renderAvatar(user) {
  let name = user.nickname || user.username
  $('#welcome').html('欢迎&nbsp;' + name)
  if (user.user_pic !== null) {
    $('.layui-nav-img').attr('src', user.user_pic).show()
    $('.text-avatar').hide()
  } else {
    $('.layui-nav-img').hide()
    let first = name[0].toUpperCase()
    $('.text-avatar').html(first).show()
  }
}
