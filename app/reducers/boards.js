const initialState = [];

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
    default: return state;
  }
}

const findTaskAndUpdate = (boards, { board_id, task_id }, update) => {
  const boardIndex = boards.findIndex((board) => board._id === board_id);
  const taskIndex = boards[boardIndex].tasks.findIndex((task) => task._id === task_id);

  boards[boardIndex].tasks[taskIndex] = {
    ...boards[boardIndex].tasks[taskIndex],
    ...update,
  }

  return [...boards];
}
