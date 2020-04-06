<?php

//首先引入文件连接数据库
include "linkMySQL.php";


//往数据库里面添加数据

// --- 增
// $sql =  "insert usergg values(x,x,x,x)";
// $conn->query($sql); //执行sql语句

// $conn->query("insert wg_360shop values(null,'https://p2.ssl.qhmsg.com/dr/180_180_/t01981601d8a2edbb8d.webp','【新品】360 智能摄像机红色警戒标准版AW2L',179.00)");
// $conn->query("insert wg_360shop values(null,'https://p3.ssl.qhmsg.com/dr/180_180_/t01c8169ecc14f6af6c.webp','360 智能摄像机云台版1080P D706/D816',149.00)");
// $conn->query("insert wg_360shop values(null,'https://p2.ssl.qhmsg.com/dr/180_180_/t019388fab2c7d532ec.webp ','360 智能摄像机小水滴AI版D903',149.00)");
// $conn->query("insert wg_360shop values(null,'https://p1.ssl.qhmsg.com/dr/180_180_/t011aaa597207d8cfff.webp','360 智能摄像机上墙支架',29.00)");
// $conn->query("insert wg_360shop values(null,'https://p3.ssl.qhmsg.com/dr/180_180_/t01fa83823d7ac12cad.webp','360 智能摄像机户外版 AW2LXT00',299.88)");
// $conn->query("insert wg_360shop values(null,'https://p2.ssl.qhmsg.com/dr/180_180_/t01ca885c0d9f8d3d54.webp','360 智能摄像机云录卡 30天包年卡',259.68)");
// $conn->query("insert wg_360shop values(null,'https://p4.ssl.qhmsg.com/dr/180_180_/t01341dca274309d111.webp','360 智能摄像机云录卡 30天半年卡',139)");
// $conn->query("insert wg_360shop values(null,'https://p3.ssl.qhmsg.com/dr/180_180_/t015bf7d25c97d974ad.webp','360 智能摄像机云录卡 7天包年卡',99.00)");
// $conn->query("insert wg_360shop values(null,'https://p3.ssl.qhmsg.com/dr/180_180_/t0149e94fcefb68b613.webp','牛丁NOERDEN 双曲蓝宝石镜面瑞士机芯男女智能手表 LIFE2+商务黑',399.00)");
// $conn->query("insert wg_360shop values(null,'https://p2.ssl.qhmsg.com/dr/180_180_/t013c30f7c69b657fe1.webp','牛丁NOERDEN 双曲蓝宝石镜面瑞士机芯男女智能手表 LIFE2+雅致灰',466.00)");
// $conn->query("insert wg_360shop values(null,'https://p4.ssl.qhmsg.com/dr/180_180_/t01f6d2449e58d1197b.webp','英国摩飞MR6080便携式电热水壶旅行大容量不锈钢保温一体自动小型家用烧水壶',278.00)");
// $conn->query("insert wg_360shop values(null,'https://p4.ssl.qhmsg.com/dr/180_180_/t01175ac5bda5a65f62.webp','漫步者（EDIFIER）W3 真无线立体声耳机 “小黄人”',269.00)");
// $conn->query("insert wg_360shop values(null,'https://p1.ssl.qhmsg.com/dr/180_180_/t01af5f411aa60c7724.webp','1MORE iBFREE蓝牙耳机 E1006 绿色',225.00)");
// $conn->query("insert wg_360shop values(null,'https://p2.ssl.qhmsg.com/dr/180_180_/t01db6c0e22552e99e4.webp','摩托罗拉 真无线蓝牙耳机 迷你入耳式运动耳机 通用苹果华为小米手机 金色',499.00)");
// $conn->query("insert wg_360shop values(null,'https://p1.ssl.qhmsg.com/dr/180_180_/t019983eb57ae4daa4f.webp','DOUDOU ET COMPAGNIE 法国豆豆毛绒玩具独角兽钥匙扣 HO2764 粉色',88.00)");
// $conn->query("insert wg_360shop values(null,'https://p4.ssl.qhmsg.com/dr/180_180_/t013f0babbad7df5765.webp','DOUDOU ET COMPAGNIE 法国豆豆毛绒玩具 淡棕色娃娃兔子公仔安抚长耳兔 HO2431',229.00)");
// $conn->query("insert wg_360shop values(null,'https://p4.ssl.qhmsg.com/dr/180_180_/t0134e41f4339a95faa.webp','萌芽熊 动漫周边坐姿毛绒玩偶23cm-熊小白',68.00)");
// //分页功能代码
$pagesize = 16 ; //十六条一页

$all = $conn->query("select * from wg_360shop");  //查询所有得数据
$num = $all->num_rows;    //所有的数据存变量

$pagenum = ceil($num / $pagesize);  // 总的数据除以要分页的条数

//获取前端的传来的页面，根据页码查询对应的数据，返回给前端。
if (isset($_GET['page'])) {
    $pagevalue = $_GET['page'];
} else {
    $pagevalue = 1;
}

$page = ($pagevalue - 1) * $pagesize;

//limit
//limit接收一个或者两个数字参数(整数)
//参1：数据开始位置的索引(从0开始)，偏移量
//参2：返回的记录集数目。
//limit 0,10  从偏移量0开始 取10条
//limit 10,10  从偏移量5开始 取10条
//limit 20,10 从偏移量14开始 取10条

$sql1 = "select * from wg_360shop limit $page,$pagesize";
$res = $conn->query($sql1);

// $res ->num_rows  //对查询到的十六条数据输出接口

$arr = array();
for($i = 0 ; $i < $res ->num_rows ; $i++){
    $arr[$i] =$res ->fetch_assoc();
}
echo json_encode($arr);  //输出接口


