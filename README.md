# 洪铟八字算命
### 项目说明：
此项目代为洪铟八字算命API微信小程序示例代码，洪铟八字算命应用在各大应用市场上市多年，累积用户过5000万，用户反馈口碑极好。  洪铟八字算命核心API包括八字算命、每天运势、八字合婚、周易起名、风水择日、阳宅风水、奇门遁甲、六爻排盘等功能。目前洪铟八字算命核心API已在阿里云市场和腾讯云市场上线，用户可以轻松将API提供的功能集成到自家产品中。无论IOS、android、小程序等都可轻松集成。
阿里云市场地址：https://market.aliyun.com/products/57126001/cmapi027257.html?spm=5176.730005.productlist.d_cmapi027257.PGFO9m#sku=yuncode2125700007

### 目录结构：
- images — 存放项目图片
- pages — 存放项目页面相关文件
- style — 存放独立wxss样式文件，可import引入
- utils — 存放utils文件，可require引入

### 测试方法:

 ![image](https://github.com/hybzorg/wxapp/blob/master/shotcup/1.png)
 ![image](https://github.com/hybzorg/wxapp/blob/master/shotcup/2.png)
 ![image](https://github.com/hybzorg/wxapp/blob/master/shotcup/3.png)
 ![image](https://github.com/hybzorg/wxapp/blob/master/shotcup/4.png)
 ![image](https://github.com/hybzorg/wxapp/blob/master/shotcup/5.png)
 ![image](https://github.com/hybzorg/wxapp/blob/master/shotcup/6.png)
 ![image](https://github.com/hybzorg/wxapp/blob/master/shotcup/7.png)
 ![image](https://github.com/hybzorg/wxapp/blob/master/shotcup/8.png)
 ![image](https://github.com/hybzorg/wxapp/blob/master/shotcup/9.png)
 
修改根目录下的app.js文件中的requestApi(path, params,message, success)函数中的APPCODE即可查看测试数据，APPCODE可以在洪铟八字算命API上购买，https://market.aliyun.com/products/57126001/cmapi027257.html

requestApi(path, params,message, success){
    var url = "https://openapi.fatebox.cn/"+path;
    network.request(url, params, message, {
      'content-type': 'application/json', // 默认值
      'Authorization': "APPCODE 7593766e238740fc81f12e74c68d7b1b",
      //appcode 可以从洪铟八字算命阿里云商店上购买API后，即可获取。https://market.aliyun.com/products/57126001/cmapi027257.html
      'X-Ca-Stage':'TEST',
       // 
    }, success, function(res){});
  },


### 开发环境：
微信开发者工具V1.0.2

### 项目地址：

https://github.com/hybzorg/wxapp
