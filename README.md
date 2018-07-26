洪铟八字算命API
--------------
## 1、项目说明：
此项目代为洪铟八字算命API微信小程序示例代码，洪铟八字算命应用在各大应用市场上市多年，累积用户过5000万，用户反馈口碑极好。  洪铟八字算命核心API包括八字算命、每天运势、八字合婚、周易起名、风水择日、阳宅风水、奇门遁甲、六爻排盘等功能。目前洪铟八字算命核心API已在阿里云市场和腾讯云市场上线，用户可以轻松将API提供的功能集成到自家产品中。无论IOS、android、小程序等都可轻松集成。
阿里云市场地址：https://market.aliyun.com/products/57126001/cmapi027257.html?spm=5176.730005.productlist.d_cmapi027257.PGFO9m#sku=yuncode2125700007

## 2、目录结构：
- images — 存放项目图片
- pages — 存放项目页面相关文件
- style — 存放独立wxss样式文件，可import引入
- utils — 存放utils文件，可require引入

## 3、测试方法:
### 3.1使用微信开发者工具打开代码
首先把开代码运行后，点首页的八字算命图标进出八字算命功能，然后输入生时后提交，发现出错，查看微信开发者工具的console栏输出，显示“403 (Forbidden)”，如下图所示：
![image](https://github.com/hybzorg/wxapp/blob/master/shotcup/6.png)
此错误是因为appcode没有权限，需要购买有效API，可从阿里云市场购买API，获取APPCODE，并修改app.js文件的appcode，即可正常查看。
### 3.2在云市场购买API
打开阿里云市场地址：https://market.aliyun.com/products/57126001/cmapi027257.html?spm=5176.730005.productlist.d_cmapi027257.PGFO9m#sku=yuncode2125700007
，然后完成购买过程，在收到阿里云市场发的邮件，如下图所示：
 ![image](https://github.com/hybzorg/wxapp/blob/master/shotcup/8.png)
 点蓝色连接，进入阿里云市场后台可查看APPCODE，如下图所示：
 ![image](https://github.com/hybzorg/wxapp/blob/master/shotcup/9.png)
### 3.3修改APPCODE

 ![image](https://github.com/hybzorg/wxapp/blob/master/shotcup/10.png)

 修改根目录下的app.js文件中的requestApi(path, params,message, success)函数中的APPCODE即可查看测试数据，APPCODE可以在洪铟八字算命阿里云商店上购买API后，即可获取。连接：https://market.aliyun.com/products/57126001/cmapi027257.html

requestApi(path, params,message, success){
    var url = "https://openapi.fatebox.cn/"+path;
    network.request(url, params, message, {
      'content-type': 'application/json', // 默认值
      'Authorization': "APPCODE 7593766e238740fc81f12e74c68d7b1b",
      //'X-Ca-Stage':'TEST',
       // 测试通道，测试通道使用MOCK，仅作开发测试用，上线后注释掉即可，使用测试通道不需要正式的量。
    }, success, function(res){});
  },
 ![image](https://github.com/hybzorg/wxapp/blob/master/shotcup/7.png)
 
### 3.4主要面页截图
修改appcode成功后，刷新，即可正常查看功能，如下图所示：
#### 3.4.1主面页
 ![image](https://github.com/hybzorg/wxapp/blob/master/shotcup/1.png)
#### 3.4.2八字算命 
 ![image](https://github.com/hybzorg/wxapp/blob/master/shotcup/2.png)
#### 3.4.3每天运势
 ![image](https://github.com/hybzorg/wxapp/blob/master/shotcup/3.png)
#### 3.4.4八字合婚
 ![image](https://github.com/hybzorg/wxapp/blob/master/shotcup/4.png)
#### 3.4.5姓名测试
 ![image](https://github.com/hybzorg/wxapp/blob/master/shotcup/5.png)


## 4、开发环境：
微信开发者工具V1.0.2

## 5、项目地址：

https://github.com/hybzorg/wxapp
