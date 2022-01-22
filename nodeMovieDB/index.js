const express = require("express");
const bodyParser = require("body-parser");
//const db = require("./db/dbconfig"); // Ei tarvita enää!
const query = require("./db/movies");
const auth = require("./services/authenticate");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = 3000;

process.env.SECRET_KEY =
  "5b1a3923cc1e1e19523fd5c3f20b409509d3ff9d42710a4da095a2ce285b009f0c3730cd9b8e1af3eb84d";

// Routes for REST API
app.get("/api/movies", auth.authenticate, query.getAllMovies);
app.post("/api/movies", auth.authenticate, query.addMovie);
app.delete("/api/movies/:id", auth.authenticate, query.deleteMovie);
app.put("/api/movies/:id", auth.authenticate, query.updateMovie);

app.post("/login", auth.login);

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});

module.exports = app;
