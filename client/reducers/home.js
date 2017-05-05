/**
 * CONSTANTS
 */
export const types = {
  HOME_SET_TITLE: 'HOME_SET_TITLE',
};

const initialState = {
  loading: false,
  data: {},
  exception: {}
};

/**
 * ACTIONS
 */
export const setTitle = title => (dispatch) => {
  // Set Title
  dispatch({ type: types.HOME_SET_TITLE, payload: title });
};

/**
 * REDUCERS
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case types.HOME_SET_TITLE:
      return { ...state,
        loading: false,
        payload: action.payload
      };
    default:
      return state;
  }
};
