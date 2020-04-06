//require.config({ })   配置模块  第三方的公共模块

require.config({
    baseUrl: 'https://cdn.bootcss.com/',//存放下面插件的公共路径
    paths: {
        'jquery': 'jquery/1.12.4/jquery.min',//注意一定要省略扩展名。
        'jquerycookie': 'jquery-cookie/1.4.1/jquery.cookie.min'
    }
});