import React from 'react';

const Modal = ({ showModal, onClose, title, children }) => {
  if (!showModal) {
    return null;
  }

  return (
    <div
      id='modal'
      className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'
    >
      <div className='bg-white p-6 rounded shadow-lg relative'>
        <span
          className='close absolute top-0 right-0 p-4 cursor-pointer'
          onClick={onClose}
        >
          &times;
        </span>
        <h2 className='text-xl mb-4'>{title}</h2>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
