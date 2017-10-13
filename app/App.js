import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Button } from 'react-bootstrap';
import { bootstrapUtils } from 'react-bootstrap/lib/utils';
bootstrapUtils.addStyle(Button, 'inverse'); // Add custom 'inverse' button style

import ModalConductor from './containers/Modals/conductor';
import Header from './containers/Header';

import { getProfile } from './actions/api/profile';

class App extends Component {
  componentDidMount() {
    const { token } = this.props;

    if (token) {
      this.props.getProfile(token);
    }
  }
  
  render() {
    return (
      <div>
        <Header />
        <ModalConductor />
        { this.props.children}
      </div>
    );
  }
};

const mapState = ({ token }) => ({
  token,
});

const mapDispatch = dispatch => ({
  getProfile: token => dispatch(getProfile(token)),
});

export default connect(mapState, mapDispatch)(App);
