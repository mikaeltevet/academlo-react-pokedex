import {SET_USERNAME} from './constants'

export const updateUsername = (username) => {
  return {
    type: SET_USERNAME,
    payload: username
  }
}