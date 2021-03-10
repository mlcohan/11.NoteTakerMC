// LOAD DATA


const fs = require('fs')


// ROUTING

module.exports = (app) => {

  
  fs.readFile('db/db.json', (err, data) => {
    if (err) throw err;

var notes = JSON.parse(data)

app.get('/api/notes', (req, res) => res.json(notes));
  


 

  app.post('/api/notes', (req, res) => {
    
   const newNote = req.body
    
   notes.push(newNote);
      
   fs.writeFile("db/db.json", JSON.stringify(notes), err => {
         if (err) throw err
         return true
       })
      res.json(true)
    })
    
  });


  // app.post('/api/clear', (req, res) => {
  //   // Empty out the arrays of data
  //   notes.length = 0;

  //   res.json({ ok: true });
  // });
};
