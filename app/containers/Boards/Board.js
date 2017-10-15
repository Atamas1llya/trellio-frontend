import React, { Component } from 'react';
import { connect } from 'react-redux';
import alertify from 'alertify.js';
import { SortableContainer } from 'react-sortable-hoc';

import BoardComponent from '../../components/Boards/Board';
import Task from './Task';
import CreateTask from '../../components/Boards/tasks/CreateTask';

import { updateBoard, deleteBoard } from '../../actions/api/boards';
import { createTask, updateTask } from '../../actions/api/tasks';

const SortableList = SortableContainer(({ tasks, board }) => {
  return (
    <div>
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
    </div>
  );
});

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

  onSortEnd({ oldIndex, newIndex }) {
    // TODO: Tasks reorder
  };

  render() {
    const { token, board, tasks } = this.props;

    return (
      <BoardComponent
        title={board.title}
        updateTitle={e => this.updateBoard(e)}
        deleteBoard={() => this.deleteBoard()}
      >
        <SortableList
          tasks={tasks}
          board={board}
          onSortEnd={e => this.onSortEnd(e)}
        />
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
  updateTask: (task, token) => dispatch(updateTask(task, token)),
});

export default connect(mapState, mapDispatch)(Board);
