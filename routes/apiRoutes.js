const router = require("express").Router();
const uuid = require("../helpers/uuid");

const {
  readFromFile,
  readAndAppend,
//   writeToFile,
} = require("../helpers/fsUtils");



router.get("/notes", (req, res) => {
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)))
  }
);

router.post("/notes", (req, res) => {
  // receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client.

  // destructuring items from req.body
  const { title, text } = req.body;

  if (title && text) {
    const newNote = {
      title,
      text,
      id: uuid(),
    };

    readAndAppend(newNote, "./db/db.json");

    const response = {
      status: "success",
      body: newNote,
    };

    res.json(response);
  } else {
    res.json("Error: Title and Text fields are required");
  }
});

// router.delete('/notes/:id', (req, res) => {
// receive a query parameter that contains the id of a note to delete. To delete a note, you'll need to read all notes from the `db.json` file, remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.
// })

module.exports = router;
