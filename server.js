import "dotenv/config"
import express  from "express";
import router from "./routes/router.js"
import cookieParser from "cookie-parser";

const app = express()
const port = process.env.APP_PORT

app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(router)

app.listen(port, () => {
  console.log(`server runs on port ${port}`)
})