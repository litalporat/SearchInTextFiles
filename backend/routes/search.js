const router = require("express").Router();
const {
  getAllSearches,
  getSearchesCount,
  addSearch,
  searchInTextFile,
} = require("../controller/search");

router.get("/", getAllSearches);

router.get("/count", getSearchesCount);

router.get("/:search", addSearch, searchInTextFile);

module.exports = router;
