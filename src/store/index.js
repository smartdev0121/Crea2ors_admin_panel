import { configureStore } from '@reduxjs/toolkit'

import loadingReducer from 'src/slices/loadingSlice'

export default configureStore({
  reducer: {
    loading: loadingReducer
  },
})