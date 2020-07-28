const Koa = require('koa');
const Serve = require('koa-static');
const Cors = require('@koa/cors');
const Range = require('koa-range');

const app = new Koa()
app.use(Range)
app.use(Cors())

app.use(Serve('.'))
app.listen(9090)

console.log(`server is ready,please visit http://localhost:9090/examples/index.html`)
