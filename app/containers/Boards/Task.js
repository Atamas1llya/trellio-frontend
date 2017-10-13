import React, { Component } from 'react';
import { connect } from 'react-redux';

import { updateTaskStatus, deleteTask } from '../../actions/api/tasks';

import TaskComponent from '../../components/Boards/tasks/Task';

class Task extends Component {
  updateStatus(status) {
    this.props.updateTaskStatus({
      board_id: this.props.board_id,
      task_id: this.props.task._id,
      status,
    }, this.props.token);
  }

  deleteTask() {
    this.props.deleteTask({
      board_id: this.props.board_id,
      task_id: this.props.task._id,
    }, this.props.token);
  }

  render() {
    const { task } = this.props;

    return (
      <TaskComponent
        completed={task.status === 'complete'}
        authorized={!!this.props.token}
        completeTask={() => this.updateStatus('complete')}
        activateTask={() => this.updateStatus('active')}
        deleteTask={() => this.deleteTask()}
        {...task}
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
