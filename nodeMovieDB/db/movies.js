const { json } = require("body-parser");
const db = require("./dbconfig");

const getAllMovies = (req, res) => {
  const query = "SELECT * FROM movies;";

  db.query(query, (err, results) => {
    if (err) console.log(err);
    else if (results.rows.length > 0) res.json(results.rows);
    else res.status(404).end();
  });
};

const getMovieById = (req, res) => {
  const query = {
    text: "SELECT * FROM movies WHERE id = $1",
    values: [req.params.id],
  };

  db.query(query, (err, results) => {
    if (err) return res.status(500).send(err.stack);
    else if (results.rows.length > 0) res.json(results.rows);
    else return res.status(404).send("Ei löytynyt!");
  });
};

const addMovie = (req, res) => {
  const newMovie = req.body;

  const text = {
    text: "INSERT INTO movies (title, director, year) VALUES ($1, $2, $3)",
    values: [newMovie.title, newMovie.director, newMovie.year],
  };

  db.query(text, (err, result) => {
    if (err) return console.error("Error executing query", err.stack);
  });

  res.json(newMovie);
};

const deleteMovie = (req, res) => {
  const query = {
    text: `DELETE FROM movies WHERE id = $1`,
    values: [req.params.id],
  };

  db.query(query, (err, result) => {
    if (!err) return res.status(200);
    if (err) console.error("Error: ", err.stack);
  });

  //res.status(204).end();
};

const deleteAllMovies = () => {
  db.query("DELETE FROM movies", (err, res) => {
    if (err) {
      return console.error("Error executing query", err.stack);
    }
  });
};

const updateMovie = (req, res) => {
  const updatedMovie = req.body;

  const query = {
    text: "UPDATE movies SET title=$1, director=$2, year=$3 WHERE id = $4",
    values: [
      updatedMovie.title,
      updatedMovie.director,
      updatedMovie.year,
      req.params.id,
    ],
  };

  db.query(query, (err, results) => {
    if (err) return console.error("Error executing: " + err.stack);
  });

  res.json(updatedMovie);
};

module.exports = {
  getAllMovies: getAllMovies,
  getMovieById: getMovieById,
  addMovie: addMovie,
  deleteMovie: deleteMovie,
  updateMovie: updateMovie,
  deleteAllMovies: deleteAllMovies,
};
