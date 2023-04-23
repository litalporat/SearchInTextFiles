const router = require("express").Router();
let TextFiles = require("../models/textFiles.model");
const fs = require("fs");

router.route("/reset").post((req, res) => {
  const categories = [];
  fs.readdirSync("./textFiles").forEach((textFile) => {
    const fileContent = fs.readFileSync(`./textFiles/${textFile}`, "utf8");
    const keywords = fileContent.split(", ");
    const categoryName = textFile.split(".")[0];
    categories.push({
      fileName: categoryName,
      keywords,
    });
  });
  console.log(categories);

  for (const category of categories) {
    const categoryDoc = new TextFiles({
      fileName: category.fileName,
      keywords: category.keywords,
    });
    categoryDoc
      .save()
      .then(() => console.log("TextFile added!"))
      .catch((err) => res.status(400).json("Error: " + err));
  }
  res.send(categories);
});

router.route("/").get((req, res) => {
  TextFiles.find()
    .then((textFiles) => res.json(textFiles))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:keyword").get((req, res) => {
  TextFiles.find()
    .then((textFiles) => {
      console.log(textFiles);
    })
    .catch((err) => res.status(400).json("Error: " + err));

  // let _id = null;
  // try {
  //   _id = ObjectId(req.params.id);
  // } catch (e) {
  //   return res.status(400).json({ error: "invalid id!" });
  // }
  // try {
  //   const products = await Product.findById(_id);

  // }
});

router.route("/add").post((req, res) => {
  const textFile = req.body.textFile;
  const newTextFile = new TextFiles({ textFile });
  newTextFile
    .save()
    .then(() => res.json("TextFile added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  TextFiles.find(ByIdAndDelete(req.params.id))
    .then(() => res.json("textFile deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
