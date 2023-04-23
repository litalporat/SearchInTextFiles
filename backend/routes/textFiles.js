const router = require("express").Router();
let TextFiles = require("../models/textFiles.model");
const fs = require("fs");

router.route("/reset").get((req, res) => {
  console.log("reset");
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
  console.log("categories", categories);

  categories.forEach(async (category) => {
    const categoryDoc = new TextFiles({
      fileName: category.fileName,
      keywords: category.keywords,
    });
    try {
      await categoryDoc.save();
      console.log("TextFile added!");
    } catch (err) {
      res.status(400).json("Error: " + err);
    }
  });

  res.send(categories);
});

router.route("/").get((req, res) => {
  TextFiles.find()
    .then((textFiles) => res.json(textFiles))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:keyword").get((req, res) => {
  const files = [];
  TextFiles.find()
    .then((textFiles) => {
      textFiles.forEach((textfile) => {
        // console.log(textfile);
        if (textfile.keywords.includes(req.params.keyword)) {
          files.push(textfile.fileName);
          console.log(files);
        }
      });
    })
    .then(() => {
      res.send(files);
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

// router.route("/add").post((req, res) => {
//   const textFile = req.body.textFile;
//   const newTextFile = new TextFiles({ textFile });
//   newTextFile
//     .save()
//     .then(() => res.json("TextFile added!"))
//     .catch((err) => res.status(400).json("Error: " + err));
// });

module.exports = router;
