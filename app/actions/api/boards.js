import Fetcher from '../wrappers/Fetcher';
import alertify from 'alertify.js';

export const getBoards = ()  => {
  return new Promise((resolve) => {
    Fetcher('/boards', {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        resolve(res.boards);
      })
      .catch((err) => {
        alertify.alert(err.message)
      })
  });
}
