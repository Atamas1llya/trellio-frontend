import React, { Component } from 'react';
import { connect } from 'react-redux';

import { createBoard, getBoards } from '../../actions/api/boards';

import BoardsComponent from '../../components/Boards';

import Board from './Board';
import CreateBoard from '../../components/Boards/CreateBoard';

class Boards extends Component {
  componentDidMount() {
    this.props.getBoards();
  }

  createEmptyBoard() {
    this.props.createBoard({
      title: 'New board',
    }, this.props.token);
  }

  render() {
    const { boards, token } = this.props;
    return (
      <div>
        <BoardsComponent>
          {
            boards.map((board, index) => {
              return <Board board={board} tasks={board.tasks} key={index} />
            })
          }
          <CreateBoard
            createBoard={() => this.createEmptyBoard()}
            authorized={!!token}
            openLoginModal={() => this.props.toggleModal('LOGIN')}
          />
        </BoardsComponent>
        { this.props.children }
      </div>
    );
  }
};

const mapState = ({ token, boards }) => ({
  token,
  boards
});

const mapDispatch = dispatch => ({
  createBoard: (board, token) => dispatch(createBoard(board, token)),
  getBoards: () => dispatch(getBoards()),
  toggleModal: modal => dispatch({ type: 'TOGGLE_MODAL', modal }),
});

export default connect(mapState, mapDispatch)(Boards);
