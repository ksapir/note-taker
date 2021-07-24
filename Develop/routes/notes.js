const fs = require('fs')
const randomid = require("../helper/randomid");

const saveNote = document.querySelector('.save-note');

// fetch POST request to server
saveNote
    .addEventListener('click', (e) => {
        e.preventDefault();
          
        
    // Get the feedback text from the DOM and assign it to a variable
    let text = document.getElementById('note-textarea').value;
    // Get the username text and add it to a variable
    let title = document.getElementById('note-title').value.trim();

    const newNote = {
        title,
        text,
        id: randomid(),
      };

fetch('http://localhost:3000/api/notes', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(newNote),
})
    .then((res) => res.json())
    .then((data) => {
        alert(data.status);
        title = '',
        text = '',
    })
})
.catch((error) => {
    console.error('Error:', error);
  });
