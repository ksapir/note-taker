const express = require ('express');
const path = require ('path');
const fs = require ('fs');

const app = express();
const PORT = process.env.PORT || 3000;

const notesContent = require('./db/db.json');

app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Get route for homepage
app.get('/', (req,res)=>
    res.sendFile(path.join(__dirname,'./public/index.html'))
);

// Get route for notes
app.get('/notes', (req,res)=>
    res.sendFile(path.join(__dirname,'./public/notes.html'))
);

app.get('/api/notes', (req, res) => 
  res.json(notesContent));

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);