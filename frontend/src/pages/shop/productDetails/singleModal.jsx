import React from 'react';
import "./singleModal.css";

const SingleModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null
  };

  return (
    <div className='single-modal-overlay'>
      <div className='single-modal-content'>
        <button className='single-modal-close' onClick={onClose}>
          X
        </button>
        {children}
      </div>
    </div>
  )
}

export default SingleModal
