const express = require("express");
const app = express();

// load configuration from env

const PORT = process.env.PORT || 4000;

// middleware to parse json req body
app.use(express.json());

// import routes for todo api

const movieRoutes = require("./routes/routes");

app.use("/api/v1", movieRoutes);

app.listen(PORT, () => {
  console.log("listening on port 0" ,PORT);
});
// connect db
const dbConnect = require("./Config/DBConnect");
dbConnect();

// default route
app.get("/", (req, res) => {
  res.send(`<h1>this is body of gome</h1>`);
});