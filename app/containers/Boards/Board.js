import React, { Component } from 'react';
import { connect } from 'react-redux';
import alertify from 'alertify.js';

import BoardComponent from '../../components/Boards/Board';
import Task from './Task';
import CreateTask from '../../components/Boards/tasks/CreateTask';

import { updateBoard, deleteBoard } from '../../actions/api/boards';

class Board extends Component {
  state = {
    saveTitleTimeout: false,
  }

  updateBoardTitle({ title }) {
    const { board, token } = this.props;
    let { saveTitleTimeout } = this.state;


    clearTimeout(saveTitleTimeout);

    this.props.updateBoardLocally({ // User will not wait
      _id: board._id,
      update: { title },
    });

    saveTitleTimeout = setTimeout(() => { // Data saved
      this.props.updateBoard({
        _id: board._id,
        update: { title },
      }, token);
    }, 300);

    this.setState({ saveTitleTimeout }); // Profit. Little wierd profit
  }

  deleteBoard() {
    const { board, token } = this.props;
    alertify.confirm('Are you sure?', () => {
      this.props.deleteBoard(board._id, token)
    })
  }

  render() {
    const { token, board, tasks } = this.props;
    return (
      <BoardComponent
        title={board.title}
        updateTitle={e => this.updateBoardTitle(e)}
        deleteBoard={() => this.deleteBoard()}
      >
        {
          tasks.map((task) => {
            return (
              <Task
                task={task}
                board_id={this.props.board._id}
                key={task._id}
              />
            )
          })
        }
        { token && <CreateTask /> }
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
  updateBoardLocally: ({ _id, update }) => dispatch({ type: 'UPDATE_BOARD', _id, update }),
  deleteBoard: (_id, token) => dispatch(deleteBoard(_id, token)),
});

export default connect(mapState, mapDispatch)(Board);
