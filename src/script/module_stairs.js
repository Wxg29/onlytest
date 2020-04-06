!function () {

    let $last = $('.movelist ul .last'); //楼梯---回到顶部
    let $btnli = $('.movelist ul li') //楼梯
    let $floor = $('.floor')  //楼层
    let $wintop = $(window).scrollTop(); //滚动条滚动的距离

    //滚动前写一遍 --- 解决刷新bug问题
    scroll()

    //滚动显示隐藏楼梯效果
    $(window).on('scroll', function () {
        scroll()
    });


    //点击楼梯跳到对应的楼层然后对应的楼梯加上active
    $btnli.not($last).on('click', function () {//not移除选中的某个元素
        $(window).off('scroll');//取消滚动条的绑定
        //点击楼梯加上active类
        $(this).addClass('active').siblings('li').removeClass('active');
        //楼层对应顶部的高度
        let $floortop = $floor.eq($(this).index()).offset().top;
        $('html,body').stop().animate({
            scrollTop: $floortop - 40
        }, 10, function () {  //回调函数，前面关闭了滚动，点击后执行滚动
            $(window).on('scroll', function () {
                scroll()
            });
        });
    });
    // 原生读写滚动条的距离
    // document.documentElelement.scrollTop = 100;
    // document.body.scrollTop = 100;



    //点击底部的回到顶部
    $last.on('click', function () {
        $('html,body').animate({
            scrollTop: 0
        }, 10);
    });


    function scroll() {
        let $wintop = $(window).scrollTop(); //滚动条滚动的距离
        // $(window).off('scroll')
        $wintop >= 400 ? $('.movelist').show() : $('.movelist').hide();
        //用每一个楼层的位置与滚动条的距离作比较
        $.each($floor, function (index, element) {
            if ($floor.eq(index).offset().top + $(element).height() / 1.5 > $wintop) {
                $btnli.eq(index).addClass('active').siblings('li').removeClass('active')
                return false;
            }
        })
    }


}();



