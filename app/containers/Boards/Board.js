import React, { Component } from 'react';
import { connect } from 'react-redux';
import alertify from 'alertify.js';

import BoardComponent from '../../components/Boards/Board';
import Task from './Task';
import CreateTask from '../../components/Boards/tasks/CreateTask';

import { updateBoard, deleteBoard } from '../../actions/api/boards';
import { createTask, updateTask, moveTask } from '../../actions/api/tasks';

class Board extends Component {
  updateBoard(update) {
    const { board, token } = this.props;

    this.props.updateBoard({
      _id: board._id,
      update,
    }, token);
  }

  deleteBoard() {
    const { board, tasks, token } = this.props;
    if (tasks.length > 0) {
      alertify.confirm('Board tasks will be removed. Are you sure?', () => {
        this.props.deleteBoard(board._id, token)
      });
    } else {
      this.props.deleteBoard(board._id, token);
    }
  }

  createEmptyTask() {
    const { token, board } = this.props;
    const task = {
      title: "New task",
      description: "New task description",
      board: board._id,
    }

    this.props.createTask(task, token);
  }

  // drop

  onDragOver(e) {
    e.preventDefault();
  }

  onDrop(e, v) { // element dropped on panel
    const task_id = this.props.draggedTask;
    const board_id = this.props.board._id;
    const { token } = this.props;

    this.props.moveTask(task_id, board_id, token);
    e.preventDefault();
  }

  render() {
    const { token, board, tasks } = this.props;

    return (
      <BoardComponent
        title={board.title}
        updateTitle={e => this.updateBoard(e)}
        deleteBoard={() => this.deleteBoard()}
        // drop
        onDragOver={e => this.onDragOver(e)}
        onDrop={e => this.onDrop(e)}
      >
        {
          tasks.map((task, index) => {
            return (
              <Task
                task={task}
                key={index}
                index={index}
                board_id={board._id}
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

const mapState = ({ token, tasks, dragndrop }, { board }) => ({
  token,
  tasks: tasks.filter(task => task.board === board._id),
  draggedTask: dragndrop,
});

const mapDispatch = dispatch => ({
  updateBoard: (params, token) => dispatch(updateBoard(params, token)),
  deleteBoard: (_id, token) => dispatch(deleteBoard(_id, token)),
  createTask: (task, token) => dispatch(createTask(task, token)),
  updateTask: (task, token) => dispatch(updateTask(task, token)),
  moveTask: (task_id, board_to, token) => dispatch(moveTask(task_id, board_to, token)),
});

export default connect(mapState, mapDispatch)(Board);
