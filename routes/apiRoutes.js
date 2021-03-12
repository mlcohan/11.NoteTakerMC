
// LOAD DATA

const path = require('path')
const fs = require("fs")
// // const store = require("../db/store")
const storedData = JSON.parse(fs.readFileSync(path.join(__dirname, "../db/db.json"), "utf8"))



module.exports = app => {
 
//   // fs.readFile("db/db.json","utf8", (err, data) => {

//   //     if (err) throw err;

//   //     var notes = JSON.parse(data);
//   //   console.log(notes)
   
       app.get("api/notes", function(req, res) {
//         console.log("hi")
           res.json(storedData);
       });

    
       app.post("api/notes", function(req, res) {
           let newNote = req.body;
           storedData.push(newNote);
           fs.writeFile("db/db.json",JSON.stringify(storedData),err => {
             if (err) throw err;
             return true;
           })
           return
       });

    
       app.get("/notes/:id", function(req,res) {
           res.json(storedData[req.params.id]);
       });

//       // app.delete("/api/notes/:id", function(req, res) {
//       //     notes.splice(req.params.id, 1);
//       //     fs.writeFile("db/db.json",JSON.stringify(notes),err => {
//       //       if (err) throw err;
//       //       return true;
//       //     })
//       // });
//     // })
   }


// // // ROUTING

// //  module.exports = (app) => {


// // app.get("/api/notes", (req, res) => {

// //   res.json(storedData)
// // })

// // app.post("/api/notes", (req, res) =>{

// //   const nextNote = req.body

// //   storedData.push(req.body)

// //   fs.writeFileSync(path.join(__dirname, '../db/db.json'), JSON.stringify(nextNote))

// //   res.json(true)
// //  })
// // }

// // // / app.delete('/api/notes/:id', (req, res) => {
  
// // // }


