import React, { useState } from 'react';

const RectangleNote = ({ id, initialText, initialPosition, onRemove }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(initialText);
  const [position, setPosition] = useState(initialPosition || { x: 0, y: 0 });

  const handleMouseDown = (e) => {
    if (e.button !== 0) return; // Only respond to left-clicks

    // Calculate the initial offset from the mouse position to the note's position
    const offsetX = e.clientX - position.x;
    const offsetY = e.clientY - position.y;

    // Function to update the note's position
    const handleMouseMove = (moveEvent) => {
      setPosition({
        x: moveEvent.clientX - offsetX,
        y: moveEvent.clientY - offsetY,
      });
    };

    // Function to clean up event listeners after dragging
    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    // Attach event listeners to the document
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    e.preventDefault();
  };

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to remove this note?')) {
      onRemove(id);
    }
  };

  const noteStyle = {
    width: '150px',
    height: '100px',
    backgroundColor: 'yellow',
    color: 'black',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: `${position.x}px`,
    top: `${position.y}px`,
    cursor: 'move',
    zIndex: 1000,
  };

  return (
    <div style={noteStyle} onMouseDown={handleMouseDown}>
      <div style={{ position: 'absolute', top: 0, right: 0 }}>
        <button onClick={handleDelete}>X</button>
      </div>
      {isEditing ? (
        <textarea
          autoFocus
          value={text}
          onChange={handleChange}
          onBlur={handleBlur}
          style={{ textAlign: 'center', fontSize: '1rem', border: 'none', outline: 'none' }}
        />
      ) : (
        <p onDoubleClick={handleDoubleClick} style={{ textAlign: 'center', fontSize: '1rem' }}>
          {text}
        </p>
      )}
    </div>
  );
};

export default RectangleNote;
