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
    const { task, token } = this.props;

    this.props.updateTask(task._id, update, token);
  }

  updateStatus(status) {
    const { task, token } = this.props;

    this.props.updateTaskStatus(task._id, status, token);
  }

  deleteTask() {
    const { task, token } = this.props;

    if (task.attachments.length > 0) {
      alertify.confirm('Attached images will be lost. Are you sure?', () => {
        this.props.deleteTask(task._id, this.props.token);
        this.props.redirect('/boards');
      });
    } else {
      this.props.deleteTask(task._id, this.props.token);
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

      const { task, token } = this.props;
      this.props.attachImage(task._id, upload, token)
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
  updateTask: (_id, update, token) => dispatch(updateTask(_id, update, token)),
  attachImage: (_id, upload, token) => dispatch(attachImage(_id, upload, token)),
  updateTaskStatus: (_id, status, token) => dispatch(updateTaskStatus(_id, status, token)),
  deleteTask: (_id, token) => dispatch(deleteTask(_id, token)),
});

export default connect(mapState, mapDispatch)(TaskInfo);
