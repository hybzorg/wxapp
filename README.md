# 洪铟八字算命
### 项目说明：
洪铟八字算命：洪铟八字算命API小程序例子程序  



### 目录结构：
- images — 存放项目图片
- pages — 存放项目页面相关文件
- style — 存放独立wxss样式文件，可import引入
- utils — 存放utils文件，可require引入

### 测试方法:
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


### 项目地址：

