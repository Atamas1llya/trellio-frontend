import Fetcher from '../wrappers/Fetcher';
import alertify from 'alertify.js';

export const getBoards = () => (dispatch) => {
  return new Promise((resolve) => {
    Fetcher('/boards', {
      headers: {
        'Content-Type': 'application/json',
      },
    }, dispatch)
      .then((res) => {
        dispatch({
          type: 'GET_BOARDS',
          boards: res.boards,
        });
        resolve(res);
      })
      .catch((err) => {
        alertify.alert(err.message)
      })
  });
}
