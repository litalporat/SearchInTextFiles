let Search = require("../models/search.model");
let TextFiles = require("../models/textFiles.model");
const fs = require("fs");

const getAllSearches = async (req, res) => {
  const searches = await Search.find();
  res.json({ count: await searches });
};

const getSearchesCount = async (req, res) => {
  const searches = await Search.find();
  res.json({ count: await searches.length });
};

const addSearch = async (req, res, next) => {
  const io = req.app.get("io");
  io.sockets.emit("search", "everyone");

  const search = req.params.search;
  const newSearch = new Search({ search });
  newSearch.save().catch((err) => res.status(400).json("Error: " + err));

  next();
};

const searchInTextFile = async (req, res) => {
  const response = { files: [] };
  const textFiles = await TextFiles.find();
  for (const textfile of await textFiles) {
    textfile.keywords.forEach((key) => {
      if (key.toLowerCase() == req.params.search.toLowerCase()) {
        response.files.push(textfile.fileName);
      }
    });
  }
  if (response.files.length == 0) response.files.push("Not Found");
  res.json(response);
};

const reset = async (req, res) => {
  const categories = [];
  fs.readdirSync("./textFiles").forEach(async (textFile) => {
    const fileContent = fs.readFileSync(`./textFiles/${textFile}`, "utf8");
    const keywords = fileContent.split(", ");
    const categoryName = textFile.split(".")[0];
    categories.push({
      fileName: categoryName,
      keywords,
    });
  });
  categories.forEach(async (category) => {
    const categoryDoc = new TextFiles({
      fileName: category.fileName,
      keywords: category.keywords,
    });
    try {
      await categoryDoc.save();
    } catch (err) {
      res.status(400).json("Error: " + err);
    }
  });

  res.json(categories);
};

module.exports = {
  getAllSearches,
  getSearchesCount,
  addSearch,
  searchInTextFile,
};
