
import React, { useState } from 'react';

const PhotoModal = ({ id, url }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      {/* Button or trigger for opening the modal */}
      <button onClick={openModal}>Open Image</button>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <img src={url} alt={`Image in Modal`} />
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoModal;