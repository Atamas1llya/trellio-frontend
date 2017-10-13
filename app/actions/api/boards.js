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
