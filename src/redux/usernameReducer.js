import {SET_USERNAME} from './constants'

export const initialState = {
  username: ''
}

export const usernameReducer = (state = initialState, action) => {
  switch(action.type) {
    case SET_USERNAME:
      return {
        ...state,
        username: action.payload
      }
    default:
      return state
  }
}