import React, { Component } from 'react';
import { connect } from 'react-redux';

import HeaderComponent from '../components/Header';

class Header extends Component {
  render() {
    return (
      <HeaderComponent
        token={this.props.token}
        user={this.props.user}
        toggleModal={this.props.toggleModal}
        exit={this.props.exit}
      />
    );
  }
};

const mapState = ({ token, user }) => ({
  token,
  user,
});

const mapDispatch = dispatch => ({
  toggleModal: modal => dispatch({ type: 'TOGGLE_MODAL', modal }),
  exit: () => dispatch({ type: 'DELETE_TOKEN' }),
});

export default connect(mapState, mapDispatch)(Header);
