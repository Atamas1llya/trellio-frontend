import React, { Component } from 'react';
import featherIcons from 'feather-icons';

import ModalConductor from './ModalConductor';

import Header from './containers/Header';

class App extends Component {
  componentDidMount() {
    featherIcons.replace();
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

export default App;
