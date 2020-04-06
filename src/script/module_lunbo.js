require(['config'], function () {//第三方模块 先加载配置文件
    require(['jquery', 'jquerycookie'], function () {//再加载配置文件里面的模块。
        // 小圆点切换
        let $img = $('.banner_img img')
        let $olli = $('.banner ol li')
        var $index = null;
        var timer = null
        $olli.on('click', function () {
            $index = $(this).index();
            lunboIndex()
        })

        // 左箭头切换
        let $leftbtn = $('.banner .leftbtn');
        $leftbtn.on('click', function () {
            $index--;
            if ($index < 0) {
                $index = $olli.length - 1
            }
            lunboIndex()
        })

        //右箭头切换
        let $rightbtn = $('.banner .rightbtn');
        $rightbtn.on('click', function () {
            $index++;
            if ($index > $olli.length - 1) {
                $index = 0
            }
            lunboIndex()
        })

        //定时器自动轮播
        timer = setInterval(function () {
            $index++;
            if ($index > $olli.length - 1) {
                $index = 0
            }
            lunboIndex()
        }, 4000)

        //鼠标移入关闭定时器的自动轮播
        $('.banner_img img').hover(function () {
            clearInterval(timer)
        }, function () {
            //鼠标移出开启定时器的自动轮播
            timer = setInterval(function () {
                $index++;
                if ($index === $olli.length) {
                    $index = 0
                }
                lunboIndex()
            }, 4000)
        })


        //函数封装
        function lunboIndex() {
            $olli.eq($index).addClass('active').siblings('li').removeClass('active')
            $img.eq($index).addClass('showimg').siblings('img').removeClass('showimg')
        }


        //登陆成功后显示用户名称
        if ($.cookie('username')) {
            $('.username').html($.cookie('username'));
            $('.quit').show();
        }

        $('.quit').on('click', function () {
            $.cookie('username', '', { expires: -1, path: '/' })
            $('.quit').hide();
            $('.username').html('登陆');
        })

    })


});