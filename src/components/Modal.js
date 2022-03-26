import React from 'react';
import "./Modal.css";

function Modal({closeModal}) {
  return (
    <div className='modalBackground'>
      <div className='modalContainer'>
        <div className='titleCloseBtn'>
        <button onClick={() => closeModal(false)} > X </button>
        </div>

        <div className='modalTitle'>
          <h1>Book Now</h1>
        </div>

        <div className='modalBody'>
        <label for="firstName">First Name</label>
        <input type="text" id="firstName" name="firstName" maxlength="100" />

        <label for="surname">Surname</label>
        <input type="text" id="surname" name="surname" maxlength="100" />

        <label for="email">Email</label>
        <input type="email" id="email" name="email" />

        <label for="location">Location</label>
        <input type="text" id="location" name="location" maxlength="100" />

        <label for="quantity">Number of People </label>
        <input type="number" id="quantity" name="quantity" />
        </div>

        <div className='modalFooter'>
          <button onClick={() => closeModal(false)}>Cancel</button>
          <button>submit</button>
        </div>
      </div>
    </div>
  );
}

export default Modal