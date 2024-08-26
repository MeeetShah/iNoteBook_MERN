import React, { useState } from "react";
import Notecontext1 from "./Notecontext1";

const host = "http://localhost:3002"
const Notestate = (props) => {
    const initialnotes = []
    const [Notes, setNotes] = useState(initialnotes)


    const fetchnotes = async () => {

        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
        });
        const json = await response.json()
        console.log(json);
        setNotes(json)

    }

    // Adding a note
    const addnote = async (title, description, tag) => {

        const response = await fetch(`${host}/api/notes/addnote`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag }),
        });
        const note = await response.json()
        setNotes(Notes.concat(note))
    }
    const deletenote = async (id) => {

        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },

        });

        const newNote = Notes.filter((note) => { return note._id !== id })
        setNotes(newNote)


    }
    const editnote = async (id, title, description, tag) => {

        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify(title, description, tag)
        });
        const json = response.json()


        let newnote = JSON.parse(JSON.stringify(Notes))
        for (let index = 0; index < newnote.length; index++) {
            const element = newnote[index];
            if (element._id === id) {
                newnote[index].title = title
                newnote[index].description = description
                newnote[index].tag = tag
                break;
            }

        }
        setNotes(newnote)
    }


    return (
        <Notecontext1.Provider value={{ Notes, addnote, deletenote, editnote, fetchnotes }}>
            {props.children}
        </Notecontext1.Provider>
    )
}

export default Notestate