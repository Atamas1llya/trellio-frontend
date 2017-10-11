import React, { Component } from 'react';
import { connect } from 'react-redux';

import SignupModalComponent from '../components/SignupModal';

class SignupModal extends Component {
  render() {
    return (
      <SignupModalComponent
        onHide={this.props.hideModal}
      />
    );
  }
};

const mapDispatch = dispatch => ({
  hideModal: () => dispatch({ type: 'TOGGLE_MODAL', modal: null }),
});

export default connect(false, mapDispatch)(SignupModal);
