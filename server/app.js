const Koa = require("koa");
const Router = require("koa-router");
const router = new Router()
const server = new Koa();
const routerLib = require("./router/index")
const cors = require("koa2-cors")
const koaBodyparser= require("koa-bodyparser");
const koaStatice = require("koa-static");
const path = require("path");
server.use(koaStatice(path.join(__dirname,"/www")));
server.use(koaBodyparser())
server.use(cors());
server.use(routerLib())
server.use(router.routes())
// 创建https服务器实例
server.listen("8089",()=>{
    console.log("官网接口run 8089")
})