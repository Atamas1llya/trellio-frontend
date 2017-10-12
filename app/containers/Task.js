import React, { Component } from 'react';
import { connect } from 'react-redux';

import { updateTaskStatus } from '../actions/api/tasks';

import TaskComponent from '../components/Task';

class Task extends Component {
  updateStatus(status) {
    const { board_id, token } = this.props;
    const task_id = this.props.task._id;

    this.props.updateTaskStatus({
      board_id,
      task_id,
      status,
    }, token);
  }

  render() {
    const { task } = this.props;

    return (
      <TaskComponent
        {...task}
        completed={task.status === 'complete'}
        authorized={!!this.props.token}
        completeTask={() => this.updateStatus('complete')}
        activateTask={() => this.updateStatus('active')}
      />
    );
  }
};

const mapState = ({ token }) => ({
  token,
});

const mapDispatch = dispatch => ({
  updateTaskStatus: (data, token) => dispatch(updateTaskStatus(data, token)),
});

export default connect(mapState, mapDispatch)(Task);
