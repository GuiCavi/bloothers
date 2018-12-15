export const actionCreators = {
  toggle: (message = '', stick = false) => ({
    type: 'TOGGLE',
    payload: { message, stick },
  }),
  updateProps: props => ({ type: 'UPDATE_PROPS', payload: props }),
};
