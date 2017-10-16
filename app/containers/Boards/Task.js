import React, { Component } from 'react';
import { connect } from 'react-redux';
import alertify from 'alertify.js';

import { updateTask, updateTaskStatus, deleteTask } from '../../actions/api/tasks';

import TaskComponent from '../../components/Boards/tasks/Task';


class Task extends Component {
  updateStatus(status) {
    const { task, token } = this.props;
    this.props.updateTaskStatus(task._id, status, token);
  }

  deleteTask() {
    const { task, token } = this.props;
    if (task.attachments.length > 0) {
      alertify.confirm('Attached images will be lost. Are you sure?', () => {
        this.props.deleteTask(task._id, token);
      });
    } else {
      this.props.deleteTask(task._id, token);
    }
  }

  updateTask(update) {
    const { task, token } = this.props;

    this.props.updateTask(task._id, update, token);
  }

  // drag task

  onDragStart(e) {
    this.props.dragTask(this.props.task._id)
  }

  render() {
    const { task } = this.props;

    return (
      <TaskComponent
        completed={task.status === 'complete'}
        authorized={!!this.props.token}
        updateTitle={(e) => this.updateTask(e)}
        completeTask={() => this.updateStatus('complete')}
        activateTask={() => this.updateStatus('active')}
        deleteTask={() => this.deleteTask()}
        index={this.props.index}
        // drag
        onDragStart={e => this.onDragStart(e)}
        {...task}
      />
    );
  }
};

const mapState = ({ token }) => ({
  token,
});

const mapDispatch = dispatch => ({
  updateTask: (_id, update, token) => dispatch(updateTask(_id, update, token)),
  updateTaskStatus: (_id, status, token) => dispatch(updateTaskStatus(_id, status, token)),
  deleteTask: (_id, token) => dispatch(deleteTask(_id, token)),
  dragTask: _id => dispatch({ type: 'DRAG_TASK', _id }),
});

export default connect(mapState, mapDispatch)(Task);
