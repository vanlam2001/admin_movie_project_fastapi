import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import userSlice from './toolkit/userSlice.js'
import spinnerSlice from './toolkit/spinnerSlice.js'
const store = configureStore({
  reducer: {
    userSlice: userSlice,
    spinnerSlice: spinnerSlice
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
