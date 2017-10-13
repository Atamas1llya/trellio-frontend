import Fetcher from '../wrappers/Fetcher';
import alertify from 'alertify.js';

import { getTasks } from './tasks';

export const getBoards = () => dispatch => {
  Fetcher('/boards', {
    headers: {
      'Content-Type': 'application/json',
    },
  }, dispatch)
    .then((res) => {
      let { boards } = res;
      const jobs = [];

      boards.forEach((board) => {
        jobs.push(dispatch(getTasks(board._id)))
      });

      dispatch({
        type: 'GET_BOARDS',
        boards,
      });

      Promise.all(jobs);
    })
    .catch((err) => {
      console.error(err);
      alertify.alert(err.message)
    });
}

export const createBoard = (board, token) => dispatch => {
  dispatch({
    type: 'CREATE_BOARD',
    board,
  });
  Fetcher('/boards', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(board),
  }, dispatch)
    .then((res) => {
      dispatch(getBoards()); // To get true _id and other server-created params
    })
    .catch((err) => {
      console.error(err);
      alertify.alert(err.message)
    });
}

export const updateBoard = ({ _id, update }, token) => dispatch => {
  Fetcher(`/boards/${_id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(update),
  }, dispatch)
    .then((res) => {
      dispatch({
        type: 'UPDATE_BOARD',
        _id,
        update,
      });
    })
    .catch((err) => {
      console.error(err);
      alertify.alert(err.message)
    });
}

export const deleteBoard = (_id, token) => dispatch => {
  Fetcher(`/boards/${_id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  }, dispatch)
    .then((res) => {
      dispatch({
        type: 'DELETE_BOARD',
        _id,
      });
    })
    .catch((err) => {
      console.error(err);
      alertify.alert(err.message)
    });
}
