import { React, useContext, useEffect, useRef, useState } from 'react'
import Notecontext from '../Context/notes/Notecontext1'
import Noteitem from './Noteitem';
import Addnote from './Addnote';
import { Navigate, useNavigate } from 'react-router-dom';


const Notes = () => {
    const context = useContext(Notecontext)
    const [note, setnote] = useState({ id: "", etitle: "", edescription: "", etag: "" })
    const { Notes, fetchnotes, editnote } = context
    const ref = useRef(null)
    const closeref = useRef(null)
    var navigate = useNavigate()
    useEffect(() => {
        if (localStorage.getItem('token')) {
            fetchnotes()
        }
        else {
            navigate("/login")
        }

    }, [])
    const handleclick = (e) => {
        console.log("updating..", note);
        editnote(note.id, note.etitle, note.edescription, note.etag)
        closeref.current.click()
    }

    const onchange = (e) => {
        setnote({ ...note, [e.target.name]: e.target.value })
    }



    const updatenote = (currentNote) => {
        ref.current.click()
        setnote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
    }
    return (
        <>
            <Addnote />

            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>


            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onchange} />
                                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">description</label>
                                    <input type="text" className="form-control" id="edescription" value={note.edescription} name="edescription" onChange={onchange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" value={note.etag} name="etag" onChange={onchange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={closeref} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleclick}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-3">
                {Notes.map((note) => <Noteitem updatenote={updatenote} note={note} />)}
            </div>
        </>
    )
}

export default Notes
