import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import alertify from 'alertify.js';

import secure from '../../decorators/secure';

import TaskInfoComponent from '../../components/Modals/TaskInfo';

import { updateTask, updateTaskStatus, deleteTask, attachImage } from '../../actions/api/tasks';

@secure
class TaskInfo extends Component {
  state = {
    uploading: false,
  }

  updateTask(update) {
    const { token, task } = this.props;

    this.props.updateTask({
      task_id: task._id,
      board_id: task.board,
      update,
    }, token);
  }

  updateStatus(status) {
    this.props.updateTaskStatus({
      board_id: this.props.task.board,
      task_id: this.props.task._id,
      status,
    }, this.props.token);
  }

  deleteTask() {
    const { task } = this.props;

    if (task.attachments.length > 0) {
      alertify.confirm('Attached images will be lost. Are you sure?', () => {
        this.props.deleteTask({
          board_id: this.props.task.board,
          task_id: this.props.task._id,
        }, this.props.token);
        this.props.redirect('/boards');
      });
    } else {
      this.props.deleteTask({
        board_id: this.props.task.board,
        task_id: this.props.task._id,
      }, this.props.token);
      this.props.redirect('/boards');
    }
  }

  uploadImage(e) {
    const image = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(image);

    reader.onload = (e) => {
      const { result } = e.target;
      const upload = {
        data: result,
        type: image.type,
      }

      this.setState({
        uploading: true,
      })

      const { token } = this.props;
      this.props.attachImage({
        board_id: this.props.task.board,
        task_id: this.props.task._id,
      }, upload, token)
        .then(() => {
          this.setState({
            uploading: false,
          })
        })
        .catch((err) => {
          this.setState({
            uploading: false,
          })
        })
    }
  }

  render() {    
    return (
      <TaskInfoComponent
        task={this.props.task}
        onHide={() => this.props.redirect('/boards')}
        updateTask={e => this.updateTask(e)}
        onImageUpload={e => this.uploadImage(e)}
        uploading={this.state.uploading}
        completeTask={() => this.updateStatus('complete')}
        activateTask={() => this.updateStatus('active')}
        deleteTask={() => this.deleteTask()}
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
  attachImage: (taskInfo, upload, token) => dispatch(attachImage(taskInfo, upload, token)),
  updateTaskStatus: (data, token) => dispatch(updateTaskStatus(data, token)),
  deleteTask: (task, token) => dispatch(deleteTask(task, token)),
});

export default connect(mapState, mapDispatch)(TaskInfo);
