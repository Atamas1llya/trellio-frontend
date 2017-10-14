import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SortableElement } from 'react-sortable-hoc';

import { updateTask, updateTaskStatus, deleteTask } from '../../actions/api/tasks';

import TaskComponent from '../../components/Boards/tasks/Task';

const SortableItem = SortableElement((props) => (
  <TaskComponent {...props} />
))

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

  updateTask(update) {
    const { token } = this.props;
    const { task, board_id } = this.props;

    this.props.updateTask({
      board_id,
      task_id: task._id,
      update,
    }, token);
  }


  render() {
    const { task } = this.props;

    return (
      <SortableItem
        completed={task.status === 'complete'}
        authorized={!!this.props.token}
        updateTitle={(e) => this.updateTask(e)}
        completeTask={() => this.updateStatus('complete')}
        activateTask={() => this.updateStatus('active')}
        deleteTask={() => this.deleteTask()}
        index={this.props.index}
        {...task}
      />
    );
  }
};

const mapState = ({ token }) => ({
  token,
});

const mapDispatch = dispatch => ({
  updateTask: (data, token) => dispatch(updateTask(data, token)),
  updateTaskStatus: (data, token) => dispatch(updateTaskStatus(data, token)),
  deleteTask: (task, token) => dispatch(deleteTask(task, token)),
});

export default connect(mapState, mapDispatch)(Task);
