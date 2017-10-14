import alertify from 'alertify.js';
import uuidV1 from 'uuid/v1';

import Fetcher from '../wrappers/Fetcher';

export const getTasks = (board_id) => dispatch => {
  return new Promise((resolve) => {
    Fetcher(`/boards/${board_id}/tasks`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        dispatch({
          type: 'GET_TASKS',
          tasks: res.tasks,
        });
        resolve(res.tasks);
      })
      .catch((err) => {
        alertify.alert(err.message)
      })
  });
}

export const createTask = (task, token) => dispatch => {
  dispatch({
    type: 'CREATE_TASK',
    task,
  });

  Fetcher(`/boards/${task.board}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(task),
  })
    .then((res) => {
      dispatch(getTasks(task.board));
    })
    .catch((err) => {
      alertify.alert(err.message)
    });
}

export const updateTask = ({ task_id, board_id, update }, token) => dispatch => {
  dispatch({
    type: 'UPDATE_TASK',
    _id: task_id,
    update,
  });

  Fetcher(`/boards/${board_id}/tasks/${task_id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(update),
  })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      alertify.alert(err.message)
    });
}

export const deleteTask = ({ board_id, task_id }, token) => dispatch => {
  dispatch({
    type: 'DELETE_TASK',
    _id: task_id,
  });

  Fetcher(`/boards/${board_id}/tasks/${task_id}`, {
    method: 'DELETE',
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
    });
}

export const updateTaskStatus = ({ board_id, task_id, status }, token) => dispatch => {
  dispatch({
    type: 'UPDATE_TASK_STATUS',
    _id: task_id,
    status,
  });

  Fetcher(`/boards/${board_id}/tasks/${task_id}/${status}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })
    .then((res) => {

    })
    .catch((err) => {
      alertify.alert(err.message)
    });
}
