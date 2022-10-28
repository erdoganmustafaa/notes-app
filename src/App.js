import React from 'react';
import uuid from 'react-uuid';
import { useEffect, useState } from 'react';
import './App.css';
import Main from './Components/Main';
import Sidebar from './Components/Sidebar';

function App() {
  const [notes,setNotes] = useState([]);
  const [activeNote,setActiveNote] = useState(false);
  useEffect(()=>{
    const savedNotes = JSON.parse(localStorage.getItem("notes"));
    if (savedNotes){
      setNotes(savedNotes);
    }
    localStorage.setItem("notes",JSON.stringify(notes))
  },[notes])
  const onAddNote = ()=>{
    const newNote = {
      id: uuid(),
      title:"Untitled Note",
      body:"",
      lastModified:Date.now(),
    };
    setNotes([newNote,...notes]);
    console.log(newNote);
  }
  
  const onUpdateNote = (updatedNote)=>{
    const updatedNotesArray = notes.map((note)=>{
      if(note.id ===activeNote){
        return updatedNote;
      }
      return note;
    });
    setNotes(updatedNotesArray);
  }
  const onDeleteNote = (idToDelete)=>{
    setNotes(notes.filter((note)=>note.id !== idToDelete))
  }

  const getActiveNote = ()=>{
    return notes.find((note)=>note.id===activeNote);
  }

  return (
    <div className="App">
      <Sidebar notes={notes} onAddNote={onAddNote} onDeleteNote={onDeleteNote} activeNote={activeNote} setActiveNote={setActiveNote}/>
      <Main activeNote={getActiveNote()} onUpdateNote={onUpdateNote}/>
    </div>
  );
}

export default App;
