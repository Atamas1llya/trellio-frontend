import React from 'react';
import { connect } from 'react-redux';

import LoginModal from './containers/LoginModal';
import SignupModal from './containers/SignupModal';

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
