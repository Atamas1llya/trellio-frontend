import React, { Component } from 'react';
import { connect } from 'react-redux';

import HeaderComponent from '../components/Header';

class Header extends Component {
  render() {
    return (
      <HeaderComponent
        token={this.props.token}
      />
    );
  }
};

const mapState = ({ token }) => ({
  token,
});

export default connect(mapState)(Header);
