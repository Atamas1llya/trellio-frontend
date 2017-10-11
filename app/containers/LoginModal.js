import React, { Component } from 'react';
import { connect } from 'react-redux';

import LoginModalComponent from '../components/LoginModal';

class LoginModal extends Component {
  render() {
    return (
      <LoginModalComponent

      />
    );
  }
};

const mapDispatch = dispatch => ({
  // login action here
});

export default connect(false, mapDispatch)(LoginModal);
