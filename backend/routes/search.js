const router = require("express").Router();
let Search = require("../models/search.model");

const io = require("socket.io")(5002, {
  cors: {
    origin: "*",
  },
});

router.route("/").get((req, res) => {
  Search.find()
    .then((searches) => res.json(searches))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/searchesnum").get((req, res) => {
  Search.find()
    .then((searches) => res.json(searches.length))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:search").get((req, res) => {
  io.sockets.emit("search", "everyone");
  const search = req.params.search;
  const newSearch = new Search({ search });
  newSearch
    .save()
    .then(() => res.json("Search added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
