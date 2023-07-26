import mongoose from "mongoose"

// Uses a global mongoose connection if it exists
const cached = global.mongoose = global.mongoose || {
  conn: null,
  promise: null
}

// Defaults to read only credentials if none exist in the environemnt
const credentials = process.env.credentials ? JSON.parse(process.env.credentials) : {
  "username": "username",
  "password": "passkey",
  "connection": "personal-portfolio-clus.qedes.mongodb.net/personal-portfolio-db"
}

// Mongoose connection URI
const uri = "mongodb+srv://" + credentials.username + ":" + credentials.password
          + "@" + credentials.connection + "?retryWrites=true&w=majority"

// Mongoose connection options
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  bufferCommands: false
}

/**
 * Verifies the given username and password
 *
 * @param {String} username The username credential
 * @param {String} password The password credential
 * @returns {Boolean} Returns the result of the verification
 */
function verifyCredentials(username, password) {
  console.log(username, password, credentials)
  return (username == credentials.username && password == credentials.password)
}

/**
 * Connects Mongoose to a MongoDB Atlas database
 *
 * @returns {Object} Returns the connection
 */
async function mongooseConnect() {
  if (!cached.promise) {
    mongoose.set("strictQuery", false)
    cached.promise = mongoose.connect(uri, options).then((conn) => {return conn})
    cached.conn = await cached.promise
  }

  return cached.conn
}

export {
  verifyCredentials,
  mongooseConnect
}
