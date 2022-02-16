export const filterReducer = (state = false, action) => {
  switch (action.type) {
    case 'FILTER_APPLIED':
      return action.payload
    default:
      return state
  }
}
