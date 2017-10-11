import React, { Component } from 'react';

import { Button } from 'react-bootstrap';
import { bootstrapUtils } from 'react-bootstrap/lib/utils';
bootstrapUtils.addStyle(Button, 'inverse'); // Add custom 'inverse' button style

import ModalConductor from './ModalConductor';
import Header from './containers/Header';

class App extends Component {
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

export default App;
