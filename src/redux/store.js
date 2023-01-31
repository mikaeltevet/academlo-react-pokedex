import {configureStore} from '@reduxjs/toolkit'
import {usernameReducer} from './usernameReducer'

export const store = configureStore({ reducer: usernameReducer })