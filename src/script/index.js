!function () {
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
}();    