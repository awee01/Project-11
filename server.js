const express = require("express");
const fs = require("fs");
const notes = require("./db/db.json");
const path = require("path");
const app = express();
var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("./public"))

// API calls
app.get("/api/notes", (req, res) => {
res.sendFile(path.join(__dirname, "./db/db.json"))
    
});

app.post("/api/notes", (req, res) => {

    req.body.id = notes.length.toString();
    const notetext = req.body;
    notes.push(notetext)

    fs.writeFileSync("./db/db.json", JSON.stringify(notes))
    res.json(notes)

});


//Delete Request
app.delete("/api/notes/:noteid", (req, res) => {

    const noteid = req.params.noteid
    for (let index = 0; index < notes.length; index++) {
    if (notes[index].id === noteid) {
        notes.splice(index, 1)
    }}

    fs.writeFileSync("./db/db.json", JSON.stringify(notes))
    res.json(notes)

});


// HTML calls
app.get("/", (req, res) => {
res.sendFile(path.join(__dirname, "./public/index.html"));
    
});

app.get("/notes", (req, res) => {
res.sendFile(path.join(__dirname, "./public/notes.html"));
    
});

app.listen(PORT, () => {
console.log(`API server now on port ${PORT}!`);
    
});
