import ApiMovies from '@app/api/movies';

export const emptyState = {
  list: [],
  inProgress: false,
};

export const initialState = {
  ...emptyState,
};

export const types = Object.freeze({
  SET_PROGRESS: 'SET_PROGRESS',
  SET_LIST: 'SET_LIST',
});

/**
 * Actions
 */
export const fetchMovies = () => {
  return (dispatch, getState) => {
    const { inProgress } = getState();

    if (inProgress) return;

    dispatch({
      type: types.SET_PROGRESS,
      value: true,
    });

    return new Promise((resolve, reject) => {
      ApiMovies.fetchAll()
        .then((resp) => {
          dispatch({
            type: types.SET_LIST,
            list: resp.data,
          });
          dispatch({
            type: types.SET_PROGRESS,
            value: false,
          });

          resolve(resp);
        })
        .catch((err) => {
          dispatch({
            type: types.SET_PROGRESS,
            value: false,
          });

          reject(err);
        });
    });
  };
};

export const actions = Object.freeze({
  fetchMovies,
});

/**
 * Reducer
 */
export const movies = (state = { ...initialState }, action) => {
  switch (action.type) {
    case types.SET_PROGRESS:
      return { ...state, inProgress: action.value };

    case types.SET_LIST:
      return { ...state, list: action.list };

    default:
      return state;
  }
};

export default movies;
