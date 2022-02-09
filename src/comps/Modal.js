import React from "react";

function Modal({ selectedImg, setSelectedImg }) {
  return (
    <div className="backdrop">
      <img src={selectedImg} alt="enlarged img" />
    </div>
  );
}

export default Modal;
