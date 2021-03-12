// LOAD DATA

const path = require('path')
const fs = require("fs")
// const store = require("../db/store")
// const storedData = JSON.parse(fs.readFileSync(path.join(__dirname, "../db/db.json"), "utf8"))



module.exports = app => {

 
  fs.readFile("db/db.json","utf8", (err, data) => {

      if (err) throw err;

      var notes = JSON.parse(data);

   
      app.get("/api/notes", function(req, res) {
          res.json(notes);
      });

    
      app.post("/api/notes", function(req, res) {
          let newNote = req.body;
          notes.push(newNote);
          fs.writeFile("db/db.json",JSON.stringify(notes,'\t'),err => {
            if (err) throw err;
            return true;
          })
          return console.log("Added new note: "+newNote.title);
      });

    
      app.get("/api/notes/:id", function(req,res) {
          res.json(notes[req.params.id]);
      });

      app.delete("/api/notes/:id", function(req, res) {
          notes.splice(req.params.id, 1);
          fs.writeFile("db/db.json",JSON.stringify(notes,'\t'),err => {
            if (err) throw err;
            return true;
          })
          console.log("Deleted note with id "+req.params.id);
      });
    })
  }


// // ROUTING

//  module.exports = (app) => {


// app.get("/api/notes", (req, res) => {

//   res.json(storedData)
// })

// app.post("/api/notes", (req, res) =>{

//   const nextNote = req.body

//   storedData.push(req.body)

//   fs.writeFileSync(path.join(__dirname, '../db/db.json'), JSON.stringify(nextNote))

//   res.json(true)
//  })
// }

// // / app.delete('/api/notes/:id', (req, res) => {
  
// // }


