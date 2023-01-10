require("dotenv").config()
require("../src/connection/Conn")()
const express = require("express")
const cors = require("cors")

const routers = require("../src/routes/index.routes")

const app = express()

app.use(cors())
app.use(express.json())

app.use(routers)

app.listen(3000, console.log("localhost:3000"))
