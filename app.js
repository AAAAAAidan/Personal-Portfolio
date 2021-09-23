const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const apiRoutes = require("./routes/apiRoutes");
const errorRoutes = require("./routes/homeRoutes");
const homeRoutes = require("./routes/homeRoutes");

// Currently using credentials with read-only access
// TODO - Use top secret cloud credentials
const username = "username";
const password = "passkey";
const connection = "personal-portfolio-clus.qedes.mongodb.net/personal-portfolio-db";
const uri = "mongodb+srv://" + username + ":" + password + "@" + connection + "?retryWrites=true&w=majority";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
.then((result) => { console.log("Connected to database") })
.catch((error) => { console.log(error) });

const app = express();

app.set("view engine", "ejs");
app.listen(process.env.PORT || 8080);

console.log("Listening for requests on port " + process.env.PORT);

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(homeRoutes);
app.use("/api", apiRoutes);
app.use((request, response) => { response.status(404).render("404"); });
