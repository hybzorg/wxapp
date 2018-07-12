function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}
Date.prototype.pattern = function (fmt) {
  var o = {
    "M+": this.getMonth() + 1, //月份         
    "d+": this.getDate(), //日         
    "h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, //小时         
    "H+": this.getHours(), //小时         
    "m+": this.getMinutes(), //分         
    "s+": this.getSeconds(), //秒         
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度         
    "S": this.getMilliseconds() //毫秒         
  };
  var week = {
    "0": "/u65e5",
    "1": "/u4e00",
    "2": "/u4e8c",
    "3": "/u4e09",
    "4": "/u56db",
    "5": "/u4e94",
    "6": "/u516d"
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  if (/(E+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f" : "/u5468") : "") + week[this.getDay() + ""]);
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
  }
  return fmt;
}       
//获取订单类型编码
function getOrderTypeCode(typ) {
  var Code = "";
  switch (typ) {
    case 1:
      Code = "PM";//算命服务
      break;
    case 2:
      Code = "MS";//白银会员
      break;
    case 3:
      Code = "MG";//白金会员
      break;

  }
  return Code;
}
function MathRand(n) {
  var Num = "";
  for (var i = 0; i < n; i++) {
    Num += Math.floor(Math.random() * 10);
  }
  return Num;
}

	//获取订单号
function getOrderNo(typ) {
  var orderNO = "";
  var date = new Date();
  var Code = getOrderTypeCode(typ);
  orderNO = Code + date.pattern("yyyyMMdd") + MathRand(4);
  return orderNO;
}
module.exports = {
  formatTime: formatTime,
  getOrderNo: getOrderNo,
}
