const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cloudUtilities = require("./lib/cloudUtilities");
const apiRoutes = require("./routes/apiRoutes");
const errorRoutes = require("./routes/homeRoutes");
const homeRoutes = require("./routes/homeRoutes");

cloudUtilities.fetchCredentials()
.then(credentials => {
  console.log("Using credentials: " + JSON.stringify(credentials));
  const uri = "mongodb+srv://" + credentials.username + ":" + credentials.password
            + "@" + credentials.connection + "?retryWrites=true&w=majority";
  console.log("Connecting to " + uri);

  mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => { console.log("Connected to database") })
  .catch((error) => { console.log(error) });
})
.catch(error => {
  console.log(error);
});

const app = express();

app.set("view engine", "ejs");
app.listen(process.env.PORT || 8080);

console.log("Listening for requests");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(homeRoutes);
app.use("/api", apiRoutes);
app.use((request, response) => { response.status(404).render("404"); });
