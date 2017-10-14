import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import secure from '../../decorators/secure';

import TaskInfoComponent from '../../components/Modals/TaskInfo';

@secure
class TaskInfo extends Component {
  render() {
    return (
      <TaskInfoComponent
        onHide={() => this.props.redirect('/boards')}
      />
    );
  }
};

const mapState = ({ token }) => ({
  token,
});

const mapDispatch = dispatch => ({
  redirect: url => dispatch(push(url)),
});

export default connect(mapState, mapDispatch)(TaskInfo);