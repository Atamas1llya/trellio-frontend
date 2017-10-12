import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getBoards } from '../actions/api/boards';

import BoardsComponent from '../components/Boards';

import Board from './Board';
import CreateBoard from '../components/CreateBoard';

class Boards extends Component {
  state = {
    boards: [],
  }

  componentDidMount() {
    getBoards()
      .then(boards => this.setState({ boards }));
  }

  render() {
    return (
      <div>
        <BoardsComponent>
          {
            this.state.boards.map((board) => {
              return <Board board={board} key={board._id} />
            })
          }
          <CreateBoard />
        </BoardsComponent>
      </div>
    );
  }
};


export default Boards;
