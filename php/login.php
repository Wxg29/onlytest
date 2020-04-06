<?php

//首先引入文件连接数据库
include "linkMySQL.php";

if (isset($_POST['name']) && isset($_POST['pass'])) {
    $name = $_POST['name'];
    $pass = $_POST['pass'];
    $result = $conn->query("select * from user_360 where username='$name' and userpass='$pass'");
    if ($result->fetch_assoc()) { //匹配成功
        echo true;
    } else { //匹配不成功
        echo false;
    }
}