import React, { Component } from 'react';
import { connect } from 'react-redux';
import getFormData from 'get-form-data';

import { login, googleLogin } from '../../actions/api/auth';

import LoginModalComponent from '../../components/Modals/Login';

class LoginModal extends Component {
  login(e) {
    e.preventDefault();

    const credentials = getFormData(e.target);

    this.props.login(credentials);
  }

  googleLogin(e) {
    const token = e.getAuthResponse().id_token;
    this.props.googleLogin({ token });
  }

  render() {
    return (
      <LoginModalComponent
        onHide={this.props.hideModal}
        onSubmit={e => this.login(e)}
        onGoogleLogin={e => this.googleLogin(e)}
      />
    );
  }
};

const mapDispatch = dispatch => ({
  hideModal: () => dispatch({ type: 'TOGGLE_MODAL', modal: null }),
  login: credentials => dispatch(login(credentials)),
  googleLogin: credentials => dispatch(googleLogin(credentials)),
});

export default connect(false, mapDispatch)(LoginModal);
