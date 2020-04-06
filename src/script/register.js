; !function () {

    let $username = $('.id input');
    let $userpass = $('.pass input')
    let $userphone = $('.phone input')

    let flag1 = true;
    let flag2 = true;
    let flag3 = true;

    //获得焦点

    //账号
    $username.on('focus', function () {
        $('.id span').html('请输入账号')
        $('.id span').css('color', '#808080')
    })

    //密码
    $userpass.on('focus', function () {
        $('.pass span').html('请输入字母，数字组成的6-12位密码')
        $('.pass span').css('color', '#808080')
    })

    //电话
    $userphone.on('focus', function () {
        $('.phone span').html('请输入11位的电话')
        $('.phone span').css('color', '#808080')
    })



    //失去焦点

    //账号
    $username.on('blur', function () {
        if ($(this).val() !== '') {

            //     let $regname = /^\d{6}$/     //0-9组成的6位数账号
            //     if ($regname.test($(this).val())) {
            //         $('.id span').html('√')
            //         $('.id span').css('color', 'green')
            //         flag1 = true;

            //     } else {
            //         $('.id span').html('输入的账号格式不对')
            //         $('.id span').css('color', 'red')
            //         flag1 = false;
            //     }

            // } else {
            //     $('.id span').html('账号不能为空')
            //     $('.id span').css('color', 'red')
            //     flag1 = false;

            $.ajax({
                type: 'post',
                url: `http://${location.hostname}/php/register.php`,
                data: {
                    name: $username.val()  //把注册的账号传给后端
                },
            }).done(function (w) {
                if (!w) {//不存在
                    $('.id span').html('√')
                    $('.id span').css('color', 'green')
                    flag1 = true;
                } else {
                    $('.id span').html('用户名已存在')
                    $('.id span').css('color', 'red')
                    flag1 = false;
                }

            })


        } else {
            $('.id span').html('账号不能为空')
            $('.id span').css('color', 'red')
            flag1 = false;
        }




    })



    //密码
    $userpass.on('blur', function () {
        if ($(this).val() !== '') {
            let $regpass = /^\d{6,12}$/     //6,12组成的6位数账号
            if ($regpass.test($(this).val())) {
                $('.pass span').html('√')
                $('.pass span').css('color', 'green')
                flag2 = true;
            } else {
                $('.pass span').html('输入的账号格式不对')
                $('.pass span').css('color', 'red')
                flag2 = false;
            }
        } else {
            $('.pass span').html('密码不能为空')
            $('.pass span').css('color', 'red')
            flag2 = false;
        }
    })



    //电话
    $userphone.on('blur', function () {
        if ($(this).val() !== '') {
            let $regphone = /^[1][3|5|7|8|9][0-9]{9}$/
            if ($regphone.test($(this).val())) {
                $('.phone span').html('√')
                $('.phone span').css('color', 'green')
                flag3 = true;
            } else {
                $('.phone span').html('输入的账号格式不对')
                $('.phone span').css('color', 'red')
                flag3 = false;
            }
        } else {
            $('.phone span').html('电话不能为空')
            $('.phone span').css('color', 'red')
            flag3 = false;
        }
    })



    $('form').on('submit', function () {
        if ($username.val() == '') {
            $('.id span').html('账号不能为空')
            $('.id span').css('color', 'red')
            flag1 = false;
        }
        if ($userpass.val() == '') {
            $('.pass span').html('密码不能为空')
            $('.pass span').css('color', 'red')
            flag2 = false;
        }
        if ($userphone.val() == '') {
            $('.phone span').html('电话不能为空')
            $('.phone span').css('color', 'red')
            flag3 = false;
        }

        if (!flag1 || !flag2 || !flag3) {
            return false;
        }
    })

}();