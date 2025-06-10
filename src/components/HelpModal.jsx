import React from 'react';
import "./HelpModal.css";

const HelpModal = ({ open, children, onClose }) => {
  if (!open) {
    return null;
  };

  return (
    <>
      <div className='help-overlay'></div>
      <div className='help-modal'>
        <button onClick={onClose}>
          X
        </button>
        {children}
      </div>
    </>
  )
}

export default HelpModal
