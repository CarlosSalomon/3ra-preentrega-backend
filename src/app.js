import express from "express"
import viewRouter from "./routes/view.router.js"
import productRouter from "./routes/products.router.js"
import cartRouter from "./routes/carts.router.js"
import { __dirname } from "./utils.js"
import handlebars from "express-handlebars"
import { Server } from "socket.io"
import cookieParser from "cookie-parser"
import connectToDB from "./config/configServer.js"
import session from "express-session"
import { usersRouterMocks } from '../src/mocks/routes/user.router.js';
//socketservers
import socketProducts from "./listeners/socketProducts.js"
import socketChatServer from "./listeners/socketChatServer.js"
import MongoStore from 'connect-mongo'
import dbRouter from "./routes/db.router.js"
import passport from "passport"
import initializePassport from "./passport/passport.config.js"
import { router as sessionsRouter } from './routes/sessions.router.js'
import { initPassportGit } from "./passport/passportGit.config.js"
import {options} from './config/config.js';


const app = express()


app.use(express.static(__dirname + "/public"))
app.use(cookieParser("CoderCookie"))
app.use(session({

    store: MongoStore.create({
        mongoUrl:options.mongo.url,
        mongoOptions:{ useNewUrlParser: true, useUnifiedTopology: true },
        ttl: 3 * 60 * 60
    }),
    secret: options.cookie.secret,
    resave: true,
    saveUninitialized: true
}))


initPassportGit()
initializePassport()
app.use(passport.initialize())
app.use(passport.session())

const PORT = options.server.port || 8080;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.engine("handlebars", handlebars.engine())
app.set('view engine', 'handlebars');
app.set("views", __dirname + "/views")
app.get('/setSession', (req, res) => {
    req.session.user = 'userName',
        req.session.admin = true
    res.send('Usuario Logueado')
})
app.get('/getSession', (req, res) => {

    res.send(req.session.user)
})

app.get('/setCookies', (req, res) => {
    res.cookie('CoderCookie', { user: options.cookie.email}, {}).send('cookie creada');
});

app.get('/getCookies', (req, res) => {
    res.send(req.cookies)
});

app.use("/api", productRouter)
app.use("/api", cartRouter)
app.use("/api", usersRouterMocks)
app.use("/", viewRouter)
app.use("/", dbRouter)
app.use('/sessions', sessionsRouter)


const httpServer = app.listen(PORT, () => {
    try {
        console.log(`Listening to the port ${PORT}\n Acceder a:`);
        console.log(`\t1). http://localhost:${PORT}/`);
    }
    catch (err) {
        console.log(err);
    }
});
connectToDB()
const socketServer = new Server(httpServer)


socketProducts(socketServer)
socketChatServer(socketServer)