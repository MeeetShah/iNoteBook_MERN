const express = require('express')
const router = express.Router()
const fetchuser = require('../Middleware/Fetchuser')
const Notes = require('../models/Notes')
const { body, validationResult } = require('express-validator')


// Fetching all notes
router.post('/fetchallnotes', fetchuser, async (req, res) => {

    const notes = await Notes.find({ user: req.user.id })
    res.json(notes)

})
// adding a note
router.post('/addnote', fetchuser, [

    body('title', 'enter a valid Title').isLength({ min: 5 }),
    body('description', 'enter a Description').isLength({ min: 5 })
], async (req, res) => {

    const { title, description, tag } = req.body

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const note = new Notes({
        title, description, tag, user: req.user.id
    })

    const savednote = await note.save()
    res.json(savednote)

})

// update a note

router.put('/updatenote/:id', fetchuser, async (req, res) => {
    try {
        const { title, description, tag } = req.body
        let newNote = {}
        if (title) { newNote.title = title }
        if (description) { newNote.description = description }
        if (tag) { newNote.tag = tag }

        let note = await Notes.findById(req.params.id)
        if (!note) {
            return res.status(404).send("not found");
        }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).senf("not Allowed");
        }

        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })

        res.json(note)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('internal error occures')
    }



})
// Delete a note
router.delete('/deletenote/:id', fetchuser, async (req, res) => {

    try {
        let note = await Notes.findById(req.params.id)
        if (!note) {
            return res.status(404).send("not found");
        }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).senf("not Allowed");
        }

        note = await Notes.findByIdAndDelete(req.params.id)

        res.json({ "Succesful": "Note is deeted", note: note })
    } catch (error) {
        console.error(error.message)
        res.status(500).send('internal error occures')
    }

})



module.exports = router