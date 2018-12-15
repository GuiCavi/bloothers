const INITIAL_STATE = {
  show: false,
  text: '',
  stick: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'TOGGLE':
      return {
        ...state,
        show: !state.show,
        text: action.payload.message,
        stick: action.payload.stick,
      };

    case 'UPDATE_PROPS':
      return { ...state, ...action.payload };

    default:
      return { ...state };
  }
};
