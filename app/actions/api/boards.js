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
        jobs.push(getTasks(board._id))
      });

      Promise.all(jobs).then((tasks) => {
        tasks.forEach((task, index) => {
          boards[index].tasks = task;
        })
      }).then(() => {
        dispatch({
          type: 'GET_BOARDS',
          boards,
        });
      })
    })
    .catch((err) => {
      console.error(err);
      alertify.alert(err.message)
    });
}
