import React, { useState } from 'react';
import SquareNote from './components/Notes/SquareNote';
import CircleNote from './components/Notes/CircleNote';
import RectangleNote from './components/Notes/RectangleNote';
import NoteContainer from './components/Notes/NoteContainer';
import NoteSelectorTab from './components/Tabs/NoteSelectorTab';
import './App.css';
import './index.css';

const App = () => {
  const [notes, setNotes] = useState([]); // Holds the list of square and circle notes

  // Function to add a new note of a selected type (excluding rectangle)
  const addNote = (type) => {
    if (type === 'rectangle') {
      // If the type is 'rectangle', this will be handled by NoteContainer
      // You might want to pass a function or state to NoteContainer if it needs to be triggered externally
      return;
    }
    const newNote = {
      id: Date.now(),
      type: type,
      text: 'Edit me',
      color: 'yellow'
    };
    setNotes([...notes, newNote]);
  };

  // Function to render square and circle notes based on their type
  const renderNote = (note) => {
    switch (note.type) {
      case 'square':
        return <SquareNote key={note.id} text={note.text} />;
      case 'circle':
        return <CircleNote key={note.id} text={note.text} />;
      default:
        return null; // Exclude rectangle notes here, as they're handled by NoteContainer
    }
  };

  return (
    <div className="app">
      <div className="notes-container">
        {notes.map(note => renderNote(note))}
      </div>
      <NoteContainer /> {/* This component now solely manages rectangle notes */}
    </div>
  );
};

export default App;
