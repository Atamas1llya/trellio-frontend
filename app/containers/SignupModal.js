import React, { Component } from 'react';
import { connect } from 'react-redux';

import SignupModalComponent from '../components/SignupModal';

class SignupModal extends Component {
  render() {
    return (
      <SignupModalComponent

      />
    );
  }
};

const mapDispatch = dispatch => ({
  // login action here
});

export default connect(false, mapDispatch)(SignupModal);
