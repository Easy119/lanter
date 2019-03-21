const db = require("../lib/mysql")
const bodyFtl = require("../lib/msg")
// 插入结果
let investResult = async (ctx) => {
  let {
    resultString
  } = ctx.request.body;
  let userSelect = resultString.map(item => {
    let userSelectString = item.opts.join(",");
    return {
      titleId: item.id,
      opts: userSelectString
    }
  });
  let count = 0;
  userSelect.forEach(async item => {
    let sql = `insert into investigate_table  (id,answer,titleId) values (0,"${item.opts}","${item.titleId}")`;
    result = await db.query(sql);
    if (result) {
      count += 1;
    } else {
      ctx.body = bodyFtl._err()
    }
  });
  if (count == 6) {
    ctx.body = bodyFtl.ok({
      "msg": "插入成功"
    })
  } else {
    ctx.body = bodyFtl._err()
  }
}
// 后台查询
let showInvestList = async (ctx) => {
  let sql = `select * from investigate_table`;
  let result = await db.query(sql);
  if (result) {
    ctx.body = bodyFtl.ok(result)
  } else {
    ctx.body = bodyFtl._err()
  }
}
module.exports = {
  investResult,
  showInvestList
}
