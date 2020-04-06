<?php

//首先引入文件连接数据库
include "linkMySQL.php";

$all = $conn->query("select * from wg_360shop");  //查询所有得数据
$num = $all->num_rows;    //所有的数据存变量



$arr = array();
for($i = 0 ; $i < $all ->num_rows ; $i++){
    $arr[$i] =$all ->fetch_assoc();
}
echo json_encode($arr);  //输出接口