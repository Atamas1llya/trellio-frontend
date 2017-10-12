import Fetcher from '../wrappers/Fetcher';
import alertify from 'alertify.js';

export const getTasks = (board_id) => {
  return new Promise((resolve) => {
    Fetcher(`/boards/${board_id}/tasks`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        resolve(res.tasks);
      })
      .catch((err) => {
        alertify.alert(err.message)
      })
  });
}

export const deleteTask = ({ board_id, task_id }, token) => dispatch => {

}

export const updateTaskStatus = ({ board_id, task_id, status }, token) => dispatch => {
  Fetcher(`/boards/${board_id}/tasks/${task_id}/${status}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      alertify.alert(err.message)
    })
}
