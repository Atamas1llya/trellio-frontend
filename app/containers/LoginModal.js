import React, { Component } from 'react';
import { connect } from 'react-redux';
import getFormData from 'get-form-data';

import { login } from '../actions/api/auth';

import LoginModalComponent from '../components/LoginModal';

class LoginModal extends Component {
  login(e) {
    e.preventDefault();

    const credentials = getFormData(e.target);

    this.props.login(credentials);
  }
  render() {
    return (
      <LoginModalComponent
        onHide={this.props.hideModal}
        onSubmit={e => this.login(e)}
      />
    );
  }
};

const mapDispatch = dispatch => ({
  hideModal: () => dispatch({ type: 'TOGGLE_MODAL', modal: null }),
  login: credentials => dispatch(login(credentials)),
});

export default connect(false, mapDispatch)(LoginModal);
