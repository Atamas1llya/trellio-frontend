import React, { Component } from 'react';
import { connect } from 'react-redux';
import getFormData from 'get-form-data';

import { signup } from '../actions/api/auth';

import SignupModalComponent from '../components/SignupModal';

class SignupModal extends Component {
  signup(e) {
    e.preventDefault();

    const credentials = getFormData(e.target);

    this.props.signup(credentials);
  }
  render() {
    return (
      <SignupModalComponent
        onHide={this.props.hideModal}
        onSubmit={e => this.signup(e)}
      />
    );
  }
};

const mapDispatch = dispatch => ({
  hideModal: () => dispatch({ type: 'TOGGLE_MODAL', modal: null }),
  signup: credentials => dispatch(signup(credentials)),
});

export default connect(false, mapDispatch)(SignupModal);
