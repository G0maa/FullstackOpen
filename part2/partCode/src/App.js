import { useState, useEffect } from "react"
import noteService from './services/notes'
import Note from './components/Note'

const App = () => {
    // So... I am confused, when should we really use `useState()`?
    // Why did we do all of this, weren't the native way easier?
    // => Wait for submit, take value...
    // => Now we change state everytime we have a keystroke.
    // How does `useState()` really work?
    const [notes, setNotes] = useState([])
    const [newNote, setNewNote] = useState('')
    const [showAll, setShowAll] = useState(true)

    useEffect(() => {
        console.log('effect')
        noteService
            .getAll()
            .then(initialNotes => {
                setNotes(initialNotes)
              })
    }, [])
    console.log('render', notes.length, 'notes')
    
    // Does any re-render re-evaluates this? I guess yes.
    const notesToShow = showAll ? notes : notes.filter(note => note.important)

    const addNote = (event) => {
        event.preventDefault()
        const noteObject = {
            content: newNote,
            date: new Date().toISOString(),
            important: Math.random() < 0.5
            // id: notes.length + 1
        }

        noteService
            .create(noteObject)
            .then(returnedNote => {
                setNotes(notes.concat(returnedNote))
                setNewNote('')
            })
    }

    const handleNoteChange = (event) => {
        console.log(event.target.value)
        setNewNote(event.target.value)
    }

    const toggleImportanceOf = (id) => {
        const note = notes.find(n => n.id === id)
        const changedNote = { ...note, important: !note.important}

        noteService
            .update(id, changedNote)
            .then(returnedNote => {
                setNotes(notes.map(note => note.id !== id ? note : returnedNote))
            })
            .catch(error => {
                alert(
                  `the note '${note.content}' was already deleted from server`
                )
                setNotes(notes.filter(n => n.id !== id))
              })
    }

    return(
        <div>
            <h1>Notes</h1>
            <div>
                <button onClick={() => setShowAll(!showAll)}>
                    show {showAll ? 'important' : 'all'}
                </button>
            </div>
            <ul>
                {notesToShow.map(note =>
                    <Note 
                        key={note.id} 
                        note={note}
                        toggleImportance={() => toggleImportanceOf(note.id)}
                     />
                )}
            </ul>
            <form onSubmit={addNote}>
                <input value={newNote}
                 onChange={handleNoteChange}
                />
                <button type="submit">save</button>
            </form>
        </div>
    )
}

export default App
