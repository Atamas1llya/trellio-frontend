const initialState = [];

const findTaskAndUpdate = (boards, { board_id, task_id }, update) => {
  const boardIndex = boards.findIndex((board) => board._id === board_id);
  const taskIndex = boards[boardIndex].tasks.findIndex((task) => task._id === task_id);

  boards[boardIndex].tasks[taskIndex] = {
    ...boards[boardIndex].tasks[taskIndex],
    ...update,
  }

  return [...boards];
}

const deleteTask = (boards, { board_id, task_id }) => {
  const boardIndex = boards.findIndex((board) => board._id === board_id);

  boards[boardIndex].tasks = boards[boardIndex].tasks.filter((task) => task._id !== task_id);

  return [...boards];
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_BOARDS': {
      return action.boards;
    }
    case 'UPDATE_TASK_STATUS': {
      return findTaskAndUpdate(state, {
        board_id: action.board_id,
        task_id: action.task_id,
      }, {
        status: action.status,
      });
    }
    case 'DELETE_TASK': {
      return deleteTask(state, {
        board_id: action.board_id,
        task_id: action.task_id,
      });
    }
    case 'DELETE_BOARD': {
      return action.boards.filter((board) => board._id !== action._id);
    }
    default: return state;
  }
}
