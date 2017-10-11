import React from 'react';

import { Modal, Button } from 'react-bootstrap';
import FieldGroup from './FieldGroup';

const LoginModal = ({ onHide, onSubmit }) => {
  return (
    <Modal show={true} onHide={onHide}>
      <form onSubmit={onSubmit}>
        <Modal.Header>
          <Modal.Title>
            <span className="brand">Trellio Login</span>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <FieldGroup
            label="Email"
            name="email"
            type="email"
            placeholder="elon.musk@gmail.com"
            required
          />
          <FieldGroup
            label="Password"
            name="passwod"
            type="password"
            placeholder="********"
            minLength="6"
            required
          />
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={onHide}>Close</Button>
          <Button bsStyle="inverse" type="submit">Log in</Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default LoginModal;
