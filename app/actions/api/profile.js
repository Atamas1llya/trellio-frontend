import Fetcher from '../wrappers/Fetcher';
import alertify from 'alertify.js';

export const getProfile = (token) => (dispatch) => {
  Fetcher('/profile', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  }, dispatch)
    .then((res) => {
      dispatch({
        user: res.profile,
        type: 'SET_USER',
      });
    })
    .catch((err) => {
      alertify.alert(err.message)
    })
}
