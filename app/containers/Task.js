import React, { Component } from 'react';
import { connect } from 'react-redux';

import { updateTaskStatus } from '../actions/api/tasks';

import TaskComponent from '../components/Task';

class Task extends Component {
  constructor(props) {
    super(props);
    this.state = props.task;
  }
  updateStatus(status) {
    const { board_id, token } = this.props;
    const task_id = this.state._id;

    this.props.updateTaskStatus({
      board_id,
      task_id,
      status,
    }, token);

    this.setState({ status })
  }
  render() {
    const task = this.state;

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
  updateTaskStatus: (task, token) => dispatch(updateTaskStatus(task, token)),
});

export default connect(mapState, mapDispatch)(Task);
