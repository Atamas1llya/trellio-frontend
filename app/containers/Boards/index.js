import React, { Component } from 'react';
import { connect } from 'react-redux';
import uuidV1 from 'uuid/v1'

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
      _id: uuidV1(),
    }, this.props.token);
  }

  render() {
    const { boards, token } = this.props;
    return (
      <div>
        <BoardsComponent>
          {
            boards.map((board) => {
              return <Board board={board} tasks={board.tasks} key={board._id} />
            })
          }
          {
            token &&
            <CreateBoard
              createBoard={() => this.createEmptyBoard()}
            />
          }
        </BoardsComponent>
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
});

export default connect(mapState, mapDispatch)(Boards);
