$(function () {
    let form = layui.form
    let layer = layui.layer

    form.verify({
        nickname: function () {
            if (value.length > 6) {
                return '昵称长度必须在1-6个字符之间'
            }
        },
    })

    function initUserInfo() {
        $.ajax({
            method: 'get',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败！')
                }
                // console.log(res);
                //调用 form.val() 快速为表单赋值
                form.val('formUserInfo', res.data)
            },
        })
    }
    initUserInfo()

    $('#btnReset').on('click', function (e) {
        //阻止表单的默认重置行为
        e.preventDefault()
        initUserInfo()
    })

    // 监听表单的提交事件
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
          method:'post',
          url:'/my/userinfo',
          data:$(this).serialize(),
          success:function (res) {
            if(res.status!==0){
              return layer.msg('更新用户信息失败')
            }
            layer.msg('更新用户信息成功')
            //调用父页面的方法重新渲染页面
            // form.val('formUserInfo', res.data)
            window.parent.getUserInfo()
          }
        })
    })
})
