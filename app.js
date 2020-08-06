import Koa from 'koa'
import Serve from 'koa-static'
import Cors from '@koa/cors'
import Range from 'koa-range'

const app = new Koa()
app.use(Range)
app.use(Cors({
    origin: '*',
    allowHeaders: ['range'],
    allowMethods: ['GET','HEAD','POST','OPTIONS'],
}))

app.use(Serve('.'))
app.listen(9090)

console.log(`server is ready,please visit http://localhost:9090/examples/index.html`)
