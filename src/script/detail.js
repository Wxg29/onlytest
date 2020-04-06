!function ($) {


    /*****************获取列表页传来的地址栏的sid的值********************/
    let $urlsid = location.search.substring(1).split('=')[1];
    // console.log($urlsid);

    if (!$urlsid) {
        $urlsid = 1;  //默认等于1
    }
    $.ajax({
        url: `http://${location.hostname}/php/detail_getsid.php`,
        data: {
            sid: $urlsid,
        },
        dataType: 'json',
    }).done(function (w) {
        console.log(w);
        $('.detail_spic img').attr('src', w.url) //更换小图
        $('.detail_bf img').attr('src', w.url) //更换大图
        $('.detail_spic img').attr('sid', w.sid) //给图片添加唯一的sid 购物车使用
        $('.title h1').html(w.title) //更换标题
        $('.price_a span').html(w.price) //价格

    })



    /*****************放大镜效果********************/
    $('.detail_spic').hover(function () {
        $('.detail_bf').css({ visibility: "visible", })
        $('.detail_sf').css({ visibility: "visible", })

        //1.求小放的宽高
        //小放/大放 = 小图/大图
        $('.detail_sf').width(($('.detail_spic').width() * $('.detail_bf').width()) / $('.detail_bpic').width());
        $('.detail_sf').height(($('.detail_spic').height() * $('.detail_bf').height()) / $('.detail_bpic').height());

        //2.鼠标移动小放跟随事件
        $('.detail_spic').on('mousemove', function (ev) {
            let X = ev.pageX;
            let Y = ev.pageY;

            let $limitleft = ev.pageX - $('.scale').offset().left - $('.detail_sf').width() / 2;
            let $limittop = ev.pageY - $('.scale').offset().top - $('.detail_sf').height() / 2;

            if ($limitleft < 0) {
                $limitleft = 0
            } else if ($limitleft > $('.detail_spic').width() - $('.detail_sf').width()) {
                $limitleft = $('.detail_spic').width() - $('.detail_sf').width()
            }
            if ($limittop < 0) {
                $limittop = 0
            } else if ($limittop > $('.detail_spic').height() - $('.detail_sf').height()) {
                $limittop = $('.detail_spic').height() - $('.detail_sf').height()
            }

            $('.detail_sf').css({
                left: $limitleft,
                top: $limittop
            })

            //3.求出比例赋值给大放
            let $bili = $('.detail_bf').width() / $('.detail_sf').width()
            $('.detail_bpic').css({
                left: - $limitleft * $bili,
                top: - $limittop * $bili,
            })
        });

    }, function () {
        $('.detail_bf').css({ visibility: "hidden", })
        $('.detail_sf').css({ visibility: "hidden", })
    });


    //4.点击切换下面的备选图片预览
    $('.imglist ul').on('click', 'li', function () {
        let $chageurl = $(this).find('img').attr('src');
        // console.log($chageurl);
        $('.detail_spic').find('img').attr('src', $chageurl);
        $('.detail_bf').find('img').attr('src', $chageurl);
    });

    //5.点击左右切换隐藏的备选图
    let $num = 5;
    $('.left').hide()
    $('.right').on('click', function () {
        $('.left').show()
        let $listlength = $('.imglist ul li').size()
        // console.log($listlength);
        if ($listlength > $num) {
            $num++;
            if ($listlength == $num) {
                $('.right').hide()
            }
            // console.log($num);
            $('.imglist ul').animate({
                left: -($num - 5) * $('.imglist ul li').eq(0).outerWidth(true)
            })

        }
    });

    $('.left').on('click', function () {
        let $listlength = $('.imglist ul li').size()
        $('.right').show();
        if ($num >= 5) {
            $num--;
            if ($num <= 5) {
                $('.left').hide()
            }
            $('.imglist ul').animate({
                left: -($num - 5) * $('.imglist ul li').eq(0).outerWidth(true)
            })
        }
    });

    //给数量文本框加点击事件
    let $number = 1;
    let $leftbtn = $('.number .leftbtn'); //减
    let $rightbtn = $('.number .rightbtn'); //加

    $leftbtn.on('click', function () {
        $number--;
        if ($number < 0) {
            $number = 0;
        }
        $('.number_a input').val($number);
    })

    $rightbtn.on('click', function () {
        $number++;
        $('.number_a input').val($number);
    })


    /*****************点击购物车按钮传递数据给购物车页面********************/
    let arrsid = [];   //存放sid
    let arrnum = [];  //存放数量

    //判断数组里面有没有cookie --- 有就走上面,没有走下面存cookie
    function pdcookie() {
        if ($.cookie('sid') && $.cookie('num')) {
            arrsid = $.cookie('sid').split(',');
            arrnum = $.cookie('num').split(',');
        } else {
            arrsid = [];
            arrnum = [];
        }
    }

    let $buybtn = $('.buycart .buybtn');
    $buybtn.on('click', function () {
        // 存cookie并且设置有效的路径
        // $.cookie('age','100',{expires:10,path:'/'})
        let $sid = $(this).parents('.detail').find('.detail_spic img').attr('sid');
        let $inputnum = $(this).parents('.right_detail').find('.number_a input').val();
        pdcookie()
        //$.inArray(value,array,[fromIndex]) 判断数组是否存在某个值
        if ($.inArray($sid, arrsid) !== -1) {//判断$sid存在
            //如果sid存在就取到对应的数量加当前要存的数量
            let $total = parseInt(arrnum[$.inArray($sid, arrsid)]) + parseInt($inputnum);
            arrnum[$.inArray($sid, arrsid)] = $total;
            $.cookie('num', arrnum, { expires: 100, path: '/' })
        } else { //sid不存在就都存进cookie
            arrsid.push($sid);
            arrnum.push($inputnum);
            // console.log(arrsid, arrnum);
            //存进了cookie
            $.cookie('sid', arrsid, { expires: 100, path: '/' })
            $.cookie('num', arrnum, { expires: 100, path: '/' })
        }


    })


    // //登陆成功后显示用户名称
    if ($.cookie('username')) {
        $('.username').html($.cookie('username'));
        $('.quit').show();
    }

    $('.quit').on('click', function () {
        $.cookie('username', '', { expires: -1, path: '/' })
        $('.quit').hide();
        $('.username').html('登陆');
    })




}(jQuery);