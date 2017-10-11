import React, { Component } from 'react';
import { connect } from 'react-redux';

import LoginModalComponent from '../components/LoginModal';

class LoginModal extends Component {
  render() {
    return (
      <LoginModalComponent
        onHide={this.props.hideModal}
      />
    );
  }
};

const mapDispatch = dispatch => ({
  hideModal: () => dispatch({ type: 'TOGGLE_MODAL', modal: null }),
});

export default connect(false, mapDispatch)(LoginModal);
