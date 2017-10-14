import React from 'react';

import LoginModal from '../containers/Modals/Login';

const secure = (WrappedComponent) => {
  return (props) => {
    if (props.token) {
      return <WrappedComponent {...props} />
    } else {
      return <LoginModal />;
    }
  }
}

export default secure;
