export const drawerReducer = (state = false, action) => {
  switch (action.type) {
    case 'DRAWER_STATUS':
      return action.payload
    default:
      return state
  }
}
