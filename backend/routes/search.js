const router = require("express").Router();
let Search = require("../models/search.model");

router.route("/").get((req, res) => {
  Search.find()
    .then((searches) => res.json(searches))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const search = req.body.search;
  const newSearch = new Search({ search });
  newSearch
    .save()
    .then(() => res.json("Search added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
