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
        <div className='help-modal-content'>
          <button className='close-button' onClick={onClose} aria-label="Close modal">
            &times;
          </button>
          {children}
        </div>
      </div>
    </>
  )
}

export default HelpModal
