//DEPENDENCIES
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

let db = require("../db/db.json");

//ROUTING
module.exports = (app) => {

  //get old notes
    app.get("/api/notes", function (req,res){
        res.json(db);
    });

    //make new notes
    app.post("/api/notes", function (req,res){
        const myNote = req.body;
        myNote.id = uuidv4(myNote.id);
        db.push(myNote);

        fs.writeFile("db/db.json", JSON.stringify(db), (err)=>{
            if (err) throw err;
        });
        
        res.json(true);
    });
  
    //delete notes
    app.delete("/api/notes/:id", function (req,res){
        const myNoteId = req.params.id;
        db = db.filter((notes, index)=>{
            return myNoteId !== notes.id;
        });

        fs.writeFile("db/db.json", JSON.stringify(db), (err)=>{
            if (err) throw err;
        });

        res.json(true);
    });
};