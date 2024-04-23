import dotenv from 'dotenv'


dotenv.config()

const MONGO = process.env.MONGODB_URI
const SECRET = process.env.SECRET_KEY
const EMAIL = process.env.EMAIL
const CLIENTID = process.env.CLIENT_ID
const CLIENTSECRET = process.env.CLIENT_SECRET
const CALLBACK = process.env.CALLBACK_URL
const PORT = process.env.PORT

export const options ={
    mongo:{
        url: MONGO
    },
    server:{
        port: PORT 
    },
    cookie:{
        secret: SECRET,
        email: EMAIL
    },
    client:{
        clientID : CLIENTID,
        clientSecret : CLIENTSECRET,
        callBackUrl : CALLBACK
    }
} 