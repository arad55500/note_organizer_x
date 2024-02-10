import React, { useState } from 'react';

const CircleNote = ({ id, initialText, initialPosition, onRemove }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(initialText);
  const [position, setPosition] = useState(initialPosition || { x: 100, y: 100 });

  const handleMouseDown = (e) => {
    if (e.button !== 0) return; // Only left mouse button

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

    e.preventDefault(); // Prevent text selection
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
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    backgroundColor: 'yellow',
    color: 'black',
    font: '16px sans-serif',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: `${position.x}px`,
    top: `${position.y}px`,
    cursor: 'move',
    zIndex: 1000,
    margin: '10px',
  };

  return (
    <div style={noteStyle} onMouseDown={handleMouseDown}>
      <div style={{ position: 'absolute', top: 0, right: 0, cursor: 'pointer' }}>
        <button onClick={handleDelete} style={{ fontSize: '12px' }}>X</button>
      </div>
      {isEditing ? (
        <textarea
          autoFocus
          value={text}
          onChange={handleChange}
          onBlur={handleBlur}
          style={{ textAlign: 'center', fontSize: '1rem', border: 'none', outline: 'none', width: '80%', height: '70%', borderRadius: '50%' }}
        />
      ) : (
        <p onDoubleClick={handleDoubleClick} style={{ margin: '10px', padding: '0' }}>
          {text}
        </p>
      )}
    </div>
  );
};

export default CircleNote;
