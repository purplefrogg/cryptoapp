import {configureStore } from '@reduxjs/toolkit'
import { CryptoApi } from '../services/cryptoAPI'
import { CryptoNewsApi } from '../services/cryptoNewsApi'

export default configureStore({
    reducer: {
        [CryptoApi.reducerPath]: CryptoApi.reducer,
        [CryptoNewsApi.reducerPath]: CryptoNewsApi.reducer
    },
})