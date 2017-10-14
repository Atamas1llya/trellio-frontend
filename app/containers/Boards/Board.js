import React, { Component } from 'react';
import { connect } from 'react-redux';
import alertify from 'alertify.js';

import BoardComponent from '../../components/Boards/Board';
import Task from './Task';
import CreateTask from '../../components/Boards/tasks/CreateTask';

import { updateBoard, deleteBoard } from '../../actions/api/boards';
import { createTask } from '../../actions/api/tasks';

class Board extends Component {
  updateBoard(update) {
    const { board, token } = this.props;

    this.props.updateBoard({
      _id: board._id,
      update,
    }, token);
  }

  deleteBoard() {
    const { board, token } = this.props;
    alertify.confirm('Are you sure?', () => {
      this.props.deleteBoard(board._id, token)
    })
  }

  createEmptyTask() {
    const { token, board } = this.props;
    const task = {
      title: "New task",
      board: board._id,
    }

    this.props.createTask(task, token);
  }

  render() {
    const { token, board, tasks } = this.props;
    return (
      <BoardComponent
        title={board.title}
        updateTitle={e => this.updateBoard(e)}
        deleteBoard={() => this.deleteBoard()}
      >
        {
          tasks.map((task, index) => {
            return (
              <Task
                task={task}
                board_id={this.props.board._id}
                key={index}
              />
            )
          })
        }
        {
          token &&
          <CreateTask
            createTask={() => this.createEmptyTask()}
          />
        }
      </BoardComponent>
    );
  }
};

const mapState = ({ token, tasks }, { board }) => ({
  token,
  tasks: tasks.filter(task => task.board === board._id),
});

const mapDispatch = dispatch => ({
  updateBoard: (params, token) => dispatch(updateBoard(params, token)),
  deleteBoard: (_id, token) => dispatch(deleteBoard(_id, token)),
  createTask: (task, token) => dispatch(createTask(task, token)),
});

export default connect(mapState, mapDispatch)(Board);
