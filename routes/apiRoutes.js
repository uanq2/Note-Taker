const router = require('express').Router();
const fs = require('fs');
const util = require('util');
const writeFileAsync = util.promisify(fs.writeFile);
const readFileAsync = util.promisify(fs.readFile);
const { v4: uuidv4 } = require('uuid');
const path = require('path');

let notes = [];

router.get('/notes', (res, req) => {
    readFileAsync("db/db.json", 'utf8');
})


router.post('/notes', (req, res) => {
    console.log("hey")
    const addNote = req.body;
    console.log('addnote', addNote)
    addNote.id = uuidv4();
    console.log('id', addNote.id);
    notes.push(addNote);
    writeFileAsync("db/db.json", JSON.stringify(notes));
    res.json(addNote);
});

router.delete('/notes/:id', (req, res) => {
    notes = notes.filter((note) => note.id !== req.params.id);
    writeFileAsync(path.join(__dirname, "../db/db.json"), JSON.stringify(notes));
    res.sendStatus(200);
});

module.exports = router;