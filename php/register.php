<?php

//首先引入文件连接数据库
include "linkMySQL.php";

if(isset($_POST['name'])){
    $username = $_POST['name'];
    //然后到数据库查找
    $result = $conn->query("select * from user_360 where username='$username'");
    if($result->fetch_assoc()){  //如果数据库存在此用户
        echo true;  //1
    }else{
        echo false; //空
    }
}


//接收前端表单提交的数据
if (isset($_POST['submit'])) {
    $name = $_POST['username'];
    $pass = sha1($_POST['userpass']);
    $phone = $_POST['userphone'];
    $conn->query("insert user_360 values(null,'$name','$pass','$phone',NOW())");
    //跳转到登陆页面
    header('location:http://wggrcc.gz01.bdysite.com/src/html/login_360.html');
}