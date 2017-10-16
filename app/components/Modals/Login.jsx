import React from 'react';

import { Modal, Button } from 'react-bootstrap';
import FieldGroup from '../FieldGroup';
import GoogleLogin from 'react-google-login';

const LoginModal = ({ onHide, onSubmit, onGoogleLogin }) => {
  return (
    <Modal show={true} onHide={onHide}>
      <form onSubmit={onSubmit}>
        <Modal.Header closeButton>
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
            name="password"
            type="password"
            placeholder="********"
            minLength="6"
            required
          />
        </Modal.Body>

        <Modal.Footer>
          <GoogleLogin
            clientId="763353141797-1qh6ictabrjkt9ssj2beno80udr63gh3.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={e => onGoogleLogin(e)}
            onFailure={e => onGoogleLogin(e)}
          />
          <Button onClick={onHide}>Close</Button>
          <Button bsStyle="inverse" type="submit">Log in</Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default LoginModal;
