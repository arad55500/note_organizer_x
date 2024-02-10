import React, { useState, useEffect } from 'react';
import RectangleNote from './RectangleNote';
import SquareNote from './SquareNote';
import CircleNote from './CircleNote';

const NoteContainer = () => {
  const [notes, setNotes] = useState([]);
  const [showMenu, setShowMenu] = useState(true);

  useEffect(() => {
    // Safely load notes from localStorage
    try {
      const savedNotes = JSON.parse(localStorage.getItem('notes') || '[]');
      setNotes(savedNotes);
    } catch (error) {
      console.error("Failed to load notes from localStorage:", error);
      setNotes([]);
    }
  }, []);

  useEffect(() => {
    // Attempt to save notes to localStorage safely
    try {
      localStorage.setItem('notes', JSON.stringify(notes));
    } catch (error) {
      console.error("Failed to save notes to localStorage:", error);
    }
  }, [notes]);

  const addNote = (type) => {
    const newNote = {
      id: Date.now(),
      type,
      text: `New ${type.charAt(0).toUpperCase() + type.slice(1)} Note`,
      position: { x: 100, y: 100 },
    };
    setNotes((prevNotes) => [...prevNotes, newNote]);
  };

  const removeNote = (id) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  // Ensuring the rendering logic is crash-proof
  const renderNote = (note) => {
    const commonProps = {
      key: note.id,
      id: note.id,
      initialText: note.text,
      initialPosition: note.position,
      onRemove: removeNote,
    };

    switch (note.type) {
      case 'rectangle': return <RectangleNote {...commonProps} />;
      case 'square': return <SquareNote {...commonProps} />;
      case 'circle': return <CircleNote {...commonProps} />;
      default: return null; // This handles undefined or unexpected note types safely
    }
  };

  return (
    <div>
      {showMenu && (
        <div style={{ display: 'flex', justifyContent: 'center', position: 'fixed', top: 0, width: '100%', backgroundColor: '#333', padding: '10px 0' }}>
          <button onClick={() => addNote('rectangle')} style={{ backgroundColor: '#333', color: 'white', margin: '0 5px' }}>▭ Rectangle</button>
          <button onClick={() => addNote('square')} style={{ backgroundColor: '#333', color: 'white', margin: '0 5px' }}>■ Square</button>
          <button onClick={() => addNote('circle')} style={{ backgroundColor: '#333', color: 'white', margin: '0 5px' }}>⬤ Circle</button>
          <button onClick={() => setShowMenu(false)} style={{ backgroundColor: '#333', color: 'white', margin: '0 5px' }}>Hide</button>
        </div>
      )}
      {!showMenu && (
        <button onClick={() => setShowMenu(true)} style={{ position: 'fixed', top: 0, left: '50%', transform: 'translateX(-50%)', backgroundColor: '#333', color: 'white', padding: '10px 15px' }}>Show Menu</button>
      )}
      <div className="notes-container" style={{ marginTop: '60px' }}>
        {notes.map(renderNote)}
      </div>

             {/* Footer */}
      <div style={{
        position: 'fixed',
        bottom: '10px',
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: '#333',
        color: 'white',
        padding: '10px 20px',
        borderRadius: '5px',
        fontSize: '12px',
        textAlign: 'center',
      }}>
        Note Organizer X Version 1.1 by Arad Okanin
      </div>


    </div>
  );
};

export default NoteContainer;
