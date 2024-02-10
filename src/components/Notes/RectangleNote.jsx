import React, { useState, useEffect } from 'react';

const RectangleNote = ({ id, initialText, initialPosition, onRemove }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(initialText);
  const [position, setPosition] = useState(initialPosition || { x: 100, y: 100 });
  const [size, setSize] = useState({ width: 150, height: 100 }); // Default size
  const [isResizing, setIsResizing] = useState(false); // Resizing state

  useEffect(() => {
    // Save changes to local storage whenever text, position, or size state changes
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    const updatedNotes = notes.map(note => {
      if (note.id === id) {
        return { ...note, text, position, size };
      }
      return note;
    });
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
  }, [id, text, position, size]); // Include size in the dependency array

  // Prevents the note from being dragged while resizing
  const handleMouseDown = (e) => {
    if (e.button !== 0 || isResizing) return; // Only respond to left-clicks and ignore if resizing

    const offsetX = e.clientX - position.x;
    const offsetY = e.clientY - position.y;

    const handleMouseMove = (moveEvent) => {
      setPosition({
        x: moveEvent.clientX - offsetX,
        y: moveEvent.clientY - offsetY,
      });
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    e.preventDefault();
  };

  // Handles resizing
  const handleResizeMouseDown = (e) => {
    // Prevent dragging event from firing
    e.stopPropagation(); 
    setIsResizing(true);

    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = size.width;
    const startHeight = size.height;

    const handleMouseMove = (moveEvent) => {
      const newWidth = Math.max(50, startWidth + moveEvent.clientX - startX);
      const newHeight = Math.max(50, startHeight + moveEvent.clientY - startY);
      setSize({ width: newWidth, height: newHeight });
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    e.preventDefault();
  };

  const noteStyle = {
    width: `${size.width}px`,
    height: `${size.height}px`,
    backgroundColor: 'yellow',
    display: 'flex',
    color: 'black',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: `${position.x}px`,
    top: `${position.y}px`,
    cursor: 'move',
    zIndex: 1000,
  };

  const resizeHandleStyle = {
    position: 'absolute',
    bottom: '0',
    right: '0',
    width: '10px',
    height: '10px',
    backgroundColor: 'red',
    cursor: 'nwse-resize',
  };

  return (
    <div style={noteStyle} onMouseDown={handleMouseDown}>
      <div style={{ position: 'absolute', top: 0, right: 0, cursor: 'pointer' }}>
        <button onClick={() => onRemove(id)}>X</button>
      </div>
      {isEditing ? (
        <textarea
          autoFocus
          value={text}
          onChange={(e) => setText(e.target.value)}
          onBlur={() => setIsEditing(false)}
          style={{ textAlign: 'center', fontSize: '1rem', border: 'none', outline: 'none', resize: 'none', width: '100%', height: '100%' }}
        />
      ) : (
        <p onDoubleClick={() => setIsEditing(true)} style={{ textAlign: 'center', fontSize: '1rem' }}>
          {text}
        </p>
      )}
      <div style={resizeHandleStyle} onMouseDown={handleResizeMouseDown}></div>
    </div>
  );
};

export default RectangleNote;
