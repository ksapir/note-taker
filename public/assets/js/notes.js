const notes = require('express').Router();
const uuid = require('../helper/uuid');

// GET Route for retrieving all the notes
notes.get('/', (req, res) => {
  console.info(`${req.method} request received for note`);

  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// POST Route for submitting note
notes.post('/', (req, res) => {
  console.log(req.body)
  
  // Log that a POST request was received
  console.info(`${req.method} request received to submit note`);

  // Destructuring assignment for the items in req.body
  const { title, text} = req.body;

  // If all the required properties are present
  if (req.body) {
    // Variable for the object we will save
    const newNote = {
      title: "",
      text: "",
      // note_id: uuid(),
    };

    readAndAppend(req.body, './db/db.json');

    // const response = {
    //   status: 'success',
    //   body: newNote,
    // };

    // res.json(response);
  } else {
    res.json('Error in posting note');
  }
});

module.exports = notes;