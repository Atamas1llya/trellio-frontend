import React, { Component } from 'react';
import { connect } from 'react-redux';

import HeaderComponent from '../components/Header';

class Header extends Component {
  render() {
    return (
      <HeaderComponent
        token={this.props.token}
        toggleModal={this.props.toggleModal}
      />
    );
  }
};

const mapState = ({ token }) => ({
  token,
});

const mapDispatch = dispatch => ({
  toggleModal: modal => dispatch({ type: 'TOGGLE_MODAL', modal }),
});

export default connect(mapState, mapDispatch)(Header);
