const mongoose = require("mongoose")

const dbUser = process.env.DB_USER
const dbPass = process.env.DB_PASS
const cluster = process.env.DB_CLUSTER

const getConn = () => {
  mongoose
    .set("strictQuery", false)
    .connect(
      `mongodb+srv://${dbUser}:${dbPass}@${cluster}.jwt8utm.mongodb.net/?retryWrites=true&w=majority`
    )
    .then(() => {
      console.log("Conectado ao banco!")
    })
    .catch((err) => console.log(err))
}

module.exports = getConn
