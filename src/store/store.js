import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import market from "../reducers/market"
import { getProducts } from '../api/getProducts'

export const store = configureStore({
    reducer: {
        market,
        [getProducts.reducerPath]:getProducts.reducer,
    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(getProducts.middleware)
})