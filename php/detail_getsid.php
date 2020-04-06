<?php

//首先引入文件连接数据库
include "linkMySQL.php";

if(isset($_GET['sid'])){
    $sid = $_GET['sid'];

    //然后到数据库查询这条数据返回给前端
    $result = $conn->query("select * from wg_360shop where sid=$sid");

    echo json_encode($result->fetch_assoc());
}
