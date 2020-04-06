!function ($) {

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


    if ($.cookie('username') == $('.username').html()) {
        //取到数据库的所有数据
        function renderclone(sid, num) {
            $.ajax({
                url: `http://${location.hostname}/php/cart.php`,
                dataType: 'json',
            }).done(function (w) {
                // console.log(w);
                $.each(w, function (index, value) {
                    if (sid == value.sid) {
                        // console.log(value);
                        //克隆     
                        let $clonetable = $('.content_detail:hidden').clone(true, true)//clone子元素和事件

                        $clonetable.find('.content_img').find('img').attr('src', value.url)
                        $clonetable.find('.content_img').find('img').attr('sid', value.sid)
                        $clonetable.find('.content_img span').html(value.title)
                        $clonetable.find('.content_price').html(value.price)
                        $clonetable.find('.number input').val(num)
                        $clonetable.find('.content_total').html((value.price * num).toFixed(2))
                        //显示克隆的内容，然后追加
                        $clonetable.css('display', 'table-row') //表格隐藏了用table-row显示
                        $('.content_table').append($clonetable);

                    }
                })

            })
        };

        //获取cookie，然后转成数组遍历传参数
        if ($.cookie('sid') && $.cookie('num')) {
            let s = $.cookie('sid').split(',');
            let n = $.cookie('num').split(',');
            $.each(s, function (index, value) {
                renderclone(s[index], n[index])
            })
        };


        //勾选全选框下面的框全部勾上
        $('.checkall').on('change', function () {
            // console.log($('.content_detail:visible').find(':checkbox'));
            if ($(this).prop('checked')) {
                $('.content_detail:visible').find(':checkbox').prop('checked', true)
            } else {
                $('.content_detail:visible').find(':checkbox').prop('checked', false)
            }
            checkprice()
        });


        //通过事件委托来取到长度
        let $inputs = $('.content_detail:visible').find(':checkbox')
        $('.content_table').on('change', $inputs, function () {
            // console.log($('.content_detail:visible').find(':checkbox').length);
            //所有文本框的长度
            let $inputlength = $('.content_detail:visible').find(':checkbox').length;
            //选中的文本框长度
            let $inputchecked = $('.content_detail:visible').find('input:checked').size();
            //判断如果选中的文本框长度等于总长度就自动勾上全选
            if ($inputlength === $inputchecked) {
                $('.checkall').prop('checked', true)
            } else {
                $('.checkall').prop('checked', false)
            }
            checkprice()

        })


        //计算总得勾选中的价格,用到的次数多---选择封装
        function checkprice() {
            let $checkpricesum = 0; //选中的价格的和
            let $checknumsum = 0;   //选中的数量的和
            //因为要对价格和数量进行累加计算，所以对显示的进行遍历
            $('.content_detail:visible').each(function (index, value) {
                if ($(value).find('.shop_input input').prop('checked')) {
                    //因为取到的内容是字符串，相加的话是拼接
                    $checkpricesum += parseFloat($(value).find('.content_total').html());
                    $checknumsum += parseInt($(value).find('.number input').val());
                }
            })
            //计算后的结果赋值给结算
            $('.pricesum span').html($checknumsum);
            $('.pricesum strong').html($checkpricesum.toFixed(2));
        }


        //给数量文本框加点击事件
        let $leftbtn = $('.number .leftbtn'); //减
        let $rightbtn = $('.number .rightbtn'); //加
        // 点击减商品数量
        $leftbtn.on('click', function () {
            //不用this的话这里就会选中所有的一起操作
            let $leftbtn_sum = $(this).parents('.content_detail').find('.number input').val()  //获取文本框的值
            $leftbtn_sum--;
            if ($leftbtn_sum < 1) {
                $leftbtn_sum = 1;
            }
            $(this).parents('.content_detail').find('.number input').val($leftbtn_sum);
            //把重新计算的值赋值给单个商品的总价，然后计算全部的总价
            $(this).parents('.content_detail').find('.content_total').html(onetotalprice($(this)))
            checkprice()
            //然后改变cookie的值
            setcookie($(this))
        })

        //点击加商品数量
        $rightbtn.on('click', function () {
            //不用this的话这里就会选中所有的一起操作
            let $leftbtn_sum = $(this).parents('.content_detail').find('.number input').val()  //获取文本框的值
            $leftbtn_sum++;
            $(this).parents('.content_detail').find('.number input').val($leftbtn_sum);
            //把重新计算的值赋值给单个商品的总价，然后计算全部的总价
            $(this).parents('.content_detail').find('.content_total').html(onetotalprice($(this)))
            checkprice()
            //然后改变cookie的值
            setcookie($(this))
        })


        //文本框改变商品数量
        $('.number input').on('input', function () {
            let $reg = /^\d+$/g; //开头到结尾一个或者多个数字
            let $value = $(this).val();
            if (!$reg.test($value)) {
                $(this).val(1);  //如果输入的不是数字就等于1
            }
            //把重新计算的值赋值给单个商品的总价，然后计算全部的总价
            $(this).parents('.content_detail').find('.content_total').html(onetotalprice($(this)))
            checkprice()
            //然后改变cookie的值
            setcookie($(this))
        })


        //点击加减要重新计算单件商品的总价
        //obj就相当于传进来的加减号，然后找他们的父元素下面的对应内容
        function onetotalprice(obj) {
            let $onevalue = parseInt(obj.parents('.content_detail').find('.number input').val());
            let $oneprice = parseFloat(obj.parents('.content_detail').find('.content_price').html());
            return $onevalue * $oneprice;
        }


        //改变cookie的值
        let arrsid = [];
        let arrsum = [];
        function pdcookie() {
            if ($.cookie('sid') && $.cookie('num')) {
                arrsid = $.cookie('sid').split(',');
                arrnum = $.cookie('num').split(',');
            } else {
                arrsid = [];
                arrnum = [];
            }

        }


        function setcookie(obj) {
            pdcookie()
            //找到图片的id，找到id后就能找到对应的数量
            let $cookiesid = obj.parents('.content_detail').find('.content_img img').attr('sid');
            //找到sid对应的数量，然后存进cookie
            arrnum[$.inArray($cookiesid, arrsid)] = obj.parents('.content_detail').find('.number input').val();
            $.cookie('num', arrnum, { expires: 10, path: '/' })
        }


        //删除
        function delcookie(sid, arrsid) {
            let $index = null; //要删除的项的索引
            $.each(arrsid, function (index, value) {
                if (sid === value) {
                    $index = index
                }
            })
            arrsid.splice($index, 1); //splice会改变原数组
            arrnum.splice($index, 1);

            $.cookie('sid', arrsid, { expires: 10, path: '/' })
            $.cookie('num', arrnum, { expires: 10, path: '/' })
        }

        //单项删除
        $('.del a').on('click', function () {
            pdcookie()
            $(this).parents('.content_detail').remove()
            delcookie($(this).parents('.content_detail').find('.content_img img').attr('sid'), arrsid)
            checkprice()
        })

        //删除选中
        $('.checkdel a').on('click', function () {
            pdcookie()
            $('.content_detail:visible').each(function (index, value) {
                if ($(this).find(':checkbox').is(':checked')) {//选中的复选框
                    $(this).remove();
                    delcookie($(this).find('img').attr('sid'), arrsid);
                }
                checkprice()
            })
        })





    }


}(jQuery);