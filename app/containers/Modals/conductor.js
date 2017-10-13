import React from 'react';
import { connect } from 'react-redux';

import LoginModal from './Login';
import SignupModal from './Signup';

const ModalConductor = ({ activeModal }) => {
  switch (activeModal) {
    case 'LOGIN': {
      return <LoginModal />
    }
    case 'SIGNUP': {
      return <SignupModal />
    }
    default: return null;
  }
}

const mapState = ({ modals }) => ({
  activeModal: modals.active,
});

export default connect(mapState)(ModalConductor);
