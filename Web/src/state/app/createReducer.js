function createReducer(initialState, handlers) {
  // rather than define a switch statement,
  // this maps the handler actions to the state and payload
  return function reducer(state = initialState, action) {
    if (action && Object.prototype.hasOwnProperty.call(handlers, action.type)) {
      return handlers[action.type](state, action.payload);
    }
    return state;
  };
}

export default createReducer;
