const db = require("../lib/mysql")
const bodyFtl = require("../lib/msg")
/*
    获取 热卖的 分类列表
    POST 请求
 */
let sendResult = async (ctx) => {
    Date.prototype.Format = function (fmt) { //author: meizz   
        var o = {
        "M+": this.getMonth() + 1, //月份   
        "d+": this.getDate(), //日   
        "h+": this.getHours(), //小时   
        "m+": this.getMinutes(), //分   
        "s+": this.getSeconds(), //秒   
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度   
        "S": this.getMilliseconds() //毫秒   
        };
        if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }
  let {
    username,
    phone,
    timer,
    score
  } = ctx.request.body;
  let nowTime = new Date().Format("yyyy-MM-dd hh:mm:ss");
  let timeStamp = new Date().getTime();
  let sql = `insert into lanter (id,username,phone,timer,score,timeStamp,dataTime) values (0,"${username}","${phone}","${timer}","${score}","${timeStamp}","${nowTime}")`;
  let result = await db.query(sql);
  if (result) {
    ctx.body = bodyFtl.ok({
      "msg": "插入成功"
    })
  } else {
    ctx.body = bodyFtl._err()
  }
}
let sortRank = (opts) => {
  let scoreHeight = opts.filter(item => {
    return item.score == 100
  });
  let resultRank = scoreHeight.sort(function (a, b) {
    return a.timer - b.timer;
  });
  return resultRank
}
let getRank = async (ctx) => {
  let sql = `SELECT * FROM lanter `;
  let result = await db.query(sql);
  let rankList = sortRank(result);
  if (result) {
    ctx.body = bodyFtl.ok(rankList)
  } else {
    ctx.body = bodyFtl._err()
  }
}
module.exports = {
  sendResult,
  getRank
}
