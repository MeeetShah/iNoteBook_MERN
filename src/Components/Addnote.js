import React, { useContext, useState } from 'react'
import Notecontext from '../Context/notes/Notecontext1'



const Addnote = () => {
    const context = useContext(Notecontext)
    const { addnote } = context
    const [note, setnote] = useState({ title: "", description: "", tag: "default" })

    const handleclick = (e) => {
        e.preventDefault()
        addnote(note.title, note.description, note.tag)

    }

    const onchange = (e) => {
        setnote({ ...note, [e.target.name]: e.target.value })
    }


    return (
        <>
            <div className="container" my-3>
                <h1>Your Notes</h1>
                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onchange} />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">description</label>
                        <input type="text" className="form-control" id="description" name="description" onChange={onchange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="tag" name="tag" onChange={onchange} />
                    </div>

                    <button  disabled={note.title.length<=5||note.description.length<=5 } type="submit" className="btn btn-primary" onClick={handleclick}>Submit</button>
                </form>

            </div>

        </>
    )
}

export default Addnote
