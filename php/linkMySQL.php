<?php
//设置字符编码
header('content-type:text/html;charset=utf-8');


//1.php连接数据库
// new mysqli(主机名，用户名，密码，数据库的名称)---连接数据库的类
//第一次连接的时候使用常量存起来，因为这个是不变的
// define('HOST','localhost');
// define('USERNAME','root');
// define('PASSWORD','');
// define('DBNAME','user_wg360');

define('HOST','b-1h7wn17qph5tvf.bch.rds.gz.baidubce.com:3306');
define('USERNAME','b_1h7wn17qph5tvf');
define('PASSWORD','w1363833510');
define('DBNAME','b_1h7wn17qph5tvf');

$conn = @new mysqli(HOST,USERNAME,PASSWORD,DBNAME);//连接成功
mysqli_set_charset($conn, 'utf8'); 
//因为点操作符用来拼接  所以用->来做对象找属性
//$conn->connect_error      connect_error---成员
if ($conn->connect_error) { //如果连接有问题，自定义报错信息
    die('数据库连接错误，请检查用户名和密码！' . $conn->connect_error);
}


