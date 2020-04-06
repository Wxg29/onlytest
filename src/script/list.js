!function () {

    let arr = [];
    let arr_defaule = [];
    let prev = null;
    let next = null;


    //1.没点击跳转就默认获取第一页的十六条数据
    $.ajax({
        url: `http://${location.hostname}/php/list.php`,
        dataType: 'json', //数据类型 JSON就会生成一个js对象
    }).done(function (w) {
        // console.log(w);//成功
        //数据成功取到然后渲染到list页面
        renderlist(w)

        //3.点击价格 --- 找到价格通过价格的比较对li重新排序
        //把li遍历放进数组，然后找到价格进行比较

        arr_defaule = [];//排序前的li数组
        arr = [];//排序中的数组
        prev = null;
        next = null;
        //提前清空数组---防止将数据带入其他页面

        $.each($('.goodslist ul li'), function (index, element) {
            arr[index] = $(this); //this就代表当前循环的每一个li  放进数组
            arr_defaule[index] = $(this);
        })
        // console.log(arr,arr_defaule);
    });


    //2.点击跳转后获取相对应的数据
    $('.page').pagination({
        pageCount: 4, //总得页数
        jump: true, //是否开启跳转到指定的页数
        coping: true, //是否开启首页和尾页，布尔值
        prevContent: '上一页',
        nextContent: '下一页',
        homePage: '首页',
        endPage: '尾页',
        callback: function (api) {
            // console.log(api.getCurrent());  //获取页码,然后传给后端
            $.ajax({
                url: `http://${location.hostname}/php/list.php`,
                data: {
                    page: api.getCurrent()
                },
                dataType: 'json',
            }).done(function (w) {
                // console.log(w);
                //获取到了后端返回的对应页数的数据----开始渲染
                renderlist(w)

                arr_defaule = [];//排序前的li数组
                arr = [];//排序中的数组
                prev = null;
                next = null;

                $.each($('.goodslist ul li'), function (index, element) {
                    arr[index] = $(this); //this就代表当前循环的每一个li  放进数组
                    arr_defaule[index] = $(this);
                });

            })
        }
    });

    //恢复默认排序
    $('.defaulesort').on('click', function () {
        $.each(arr_defaule, function (inedx, element) {
            $('.goodslist ul').append(element);
        })
        return;
    });

    //价格升序排序
    $('.pricesort').on('click', function () {   //排序绑定点击事件
        // alert(111)
        for (let i = 0; i < arr.length - 1; i++) {
            for (let j = 0; j < arr.length - i - 1; j++) {
                //现在开始找到li里面的价格开始比较
                prev = parseFloat(arr[j].find('span').html().substring(1));
                next = parseFloat(arr[j + 1].find('span').html().substring(1));
                if (prev > next) {
                    let temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }
        //排序比较后将之前的内容清空，然后把排序好的追加进去
        appendli()
    });

    //价格升序排序
    $('.pricedown').on('click', function () {   //排序绑定点击事件
        // alert(111)
        for (let i = 0; i < arr.length - 1; i++) {
            for (let j = 0; j < arr.length - i - 1; j++) {
                //现在开始找到li里面的价格开始比较
                prev = parseFloat(arr[j].find('span').html().substring(1));
                next = parseFloat(arr[j + 1].find('span').html().substring(1));
                console.log(prev, next);
                if (prev < next) {
                    let temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }
        //排序比较后将之前的内容清空，然后把排序好的追加进去
        appendli()
    });



    //封装列表的渲染
    function renderlist(w) {
        let $strhtml = '';
        $.each(w, function (index, value) {
            $strhtml +=
                `
                    <li sid="${value.sid}">
                        <a href="detail.html?sid=${value.sid}">
                            <img class="lazy" data-original ="${value.url}">
                            <p  class="sl">${value.title}</p>
                            <span>￥ ${value.price}</span>
                        </a>
                    </li>
                    
                    `;
            $('.goodslist ul').html($strhtml);
            // <a href="#"><i class="iconfont icon-gouwuche1"></i>加入购物车</a>
            //懒加载
            $(function () {
                $("img.lazy").lazyload({ effect: "fadeIn" });
            });
        })
    };

    //封装 排好序的li添加进页面
    function appendli() {
        $('.goodslist ul').empty();//empty() : 删除匹配的元素集合中所有的子节点
        $.each(arr, function (inedx, element) {
            $('.goodslist ul').append(element);
        });
    }


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