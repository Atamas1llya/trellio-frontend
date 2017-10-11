import { push } from 'react-router-redux';
import { apiHost } from '../../config';

const Fetcher = (url, settings, dispatch) => {
  return new Promise((resolve, reject) => {
    fetch(apiHost + url, settings)
      .then((res) => {
        if (res.ok) {
          return res;
        }

        if (res.status === 403) {
          dispatch({ type: 'DELETE_TOKEN' });
        }

        throw new Error(res.statusText);
      })
      .then(res => res.json())
      .then((json) => {
        resolve(json);
      })
      .catch((err) => {
        console.error(err);
        reject(err);
      });
  });
}

export default Fetcher;
