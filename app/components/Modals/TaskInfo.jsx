import React from 'react';

import { Modal } from 'react-bootstrap';

const SignupModal = ({ onHide }) => {
  return (
    <Modal show={true} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>
          <span className="brand">Task</span>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>

      </Modal.Body>
      <Modal.Footer>

      </Modal.Footer>
    </Modal>
  );
};

export default SignupModal;
