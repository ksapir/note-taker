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

app.post('/api/notes', (req,res) => {
  fs.readFile((path.join(__dirname,'./db/db.json')), 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      console.log(parsedData)
      parsedData.push(req.body);
      fs.writeFile('./db/db.json', JSON.stringify(parsedData), (err) =>{
        if (err) {
          console.error(err);
        } 
        res.json(parsedData)
      });
    }
  });
})

app.get('*', (req,res)=>
    res.sendFile(path.join(__dirname,'./public/index.html'))
);


app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);