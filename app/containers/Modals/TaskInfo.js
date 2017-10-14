import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import secure from '../../decorators/secure';

import TaskInfoComponent from '../../components/Modals/TaskInfo';

import { updateTask } from '../../actions/api/tasks';

@secure
class TaskInfo extends Component {
  updateTask(update) {
    const { token, task } = this.props;

    this.props.updateTask({
      task_id: task._id,
      board_id: task.board,
      update,
    }, token);
  }
  render() {
    return (
      <TaskInfoComponent
        task={this.props.task}
        onHide={() => this.props.redirect('/boards')}
        updateTask={e => this.updateTask(e)}
      />
    );
  }
};

const mapState = ({ token, tasks }, { params }) => ({
  token,
  task: tasks.find(task => task._id === params._id),
});

const mapDispatch = dispatch => ({
  redirect: url => dispatch(push(url)),
  updateTask: (update, token) => dispatch(updateTask(update, token)),
});

export default connect(mapState, mapDispatch)(TaskInfo);
