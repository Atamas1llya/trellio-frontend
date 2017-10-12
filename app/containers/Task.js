import React, { Component } from 'react';
import { connect } from 'react-redux';

import { updateTaskStatus, deleteTask } from '../actions/api/tasks';

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

  deleteTask() {
    const { board_id, token } = this.props;
    const task_id = this.props.task._id;

    this.props.deleteTask({ board_id, task_id }, token);
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
        deleteTask={() => this.deleteTask()}
      />
    );
  }
};

const mapState = ({ token }) => ({
  token,
});

const mapDispatch = dispatch => ({
  updateTaskStatus: (data, token) => dispatch(updateTaskStatus(data, token)),
  deleteTask: (task, token) => dispatch(deleteTask(task, token)),
});

export default connect(mapState, mapDispatch)(Task);
