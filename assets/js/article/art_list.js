$(function () {
    let layer = layui.layer
    let form = layui.form
    let laypage = layui.laypage
    // 定义美化时间的过滤器
    template.defaults.imports.dataFormat = function (date) {
        const dt = new Date(date)
        let y = padZero(dt.getFullYear())
        let m = padZero(dt.getMonth() + 1)
        let d = padZero(dt.getDate())
        let hh = padZero(dt.getHours())
        let mm = padZero(dt.getMinutes())
        let ss = padZero(dt.getSeconds())

        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
    }
    function padZero(n) {
        return n > 9 ? n : '0' + n
    }

    let listData = {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: '',
    }
    initTable()
    initCate()
    function initTable() {
        $.ajax({
            type: 'get',
            url: '/my/article/list',
            data: listData,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取文章列表失败')
                }
                // 使用模板引擎渲染数据
                let htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
                renderPage(res.total)
            },
        })
    }

    // 初始化文章分类方法
    function initCate() {
        $.ajax({
            method: 'get',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取分类数据失败')
                }
                let htmlStr = template('tpl-cate', res)
                $('[name=cate_id]').html(htmlStr)
                form.render()
            },
        })
    }

    // 为筛选表单添加 submit事件
    $('#form-search').on('submit', function (e) {
        flag = true
        e.preventDefault()
        let cate_id = $('[name=cate_id]').val()
        let state = $('[name=state]').val()
        listData.cate_id = cate_id
        listData.state = state
        initTable()
    })

    // 定义渲染分页的方法
    function renderPage(total) {
        flag = true
        laypage.render({
            elem: 'pageBox',
            count: total,
            limit: listData.pagesize,
            curr: listData.pagenum,
            layout: ['cound', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 10],
            jump: function (obj, first) {
                listData.pagenum = obj.curr
                listData.pagesize = obj.limit
                if (!first) {
                    initTable()
                }
            },
        })
    }

    // 通过代理的形式，为删除按钮绑定点击事件处理函数
    $('tbody').on('click', '.btn-delete', function () {
        // 获取删除按钮的个数
        var len = $('.btn-delete').length
        console.log(len)
        // 获取到文章的 id
        var id = $(this).attr('data-id')
        // 询问用户是否要删除数据
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                method: 'GET',
                url: '/my/article/delete/' + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('删除文章失败！')
                    }
                    layer.msg('删除文章成功！')
                    // 当数据删除完成后，需要判断当前这一页中，是否还有剩余的数据
                    // 如果没有剩余的数据了,则让页码值 -1 之后,
                    // 再重新调用 initTable 方法
                    // 4
                    if (len === 1) {
                        // 如果 len 的值等于1，证明删除完毕之后，页面上就没有任何数据了
                        // 页码值最小必须是 1
                        q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1
                    }
                    initTable()
                },
            })

            layer.close(index)
        })
    })
})
