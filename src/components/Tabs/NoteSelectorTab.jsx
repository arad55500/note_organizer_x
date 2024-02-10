import React, { useState } from 'react';

const NoteSelectorTab = ({ onNoteSelected }) => {
  const [isOpen, setIsOpen] = useState(true); // State to track if the menu is open

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const noteStyle = {
    display: 'inline-block',
    width: '50px',
    height: '50px',
    backgroundColor: 'yellow',
    margin: '10px',
    cursor: 'pointer',
  };

  const squareStyle = { ...noteStyle };
  const circleStyle = { ...noteStyle, borderRadius: '50%' };
  const rectangleStyle = { ...noteStyle, width: '75px' };

  const menuStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#171717',
    padding: '10px',
    color: 'black',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    transition: 'transform 0.3s ease-in-out',
    transform: isOpen ? 'translateY(0)' : 'translateY(-100%)',
  };

  return (
    <div>
      <div style={menuStyle}>
        <div style={squareStyle} onClick={() => onNoteSelected('square')}></div>
        <div style={circleStyle} onClick={() => onNoteSelected('circle')}></div>
        <div style={rectangleStyle} onClick={() => onNoteSelected('rectangle')}></div>
        <button onClick={toggleMenu}>{isOpen ? '^' : 'v'}</button>
      </div>
    </div>
  );
};

export default NoteSelectorTab;
