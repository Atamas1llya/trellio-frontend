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
