import { configureStore } from '@reduxjs/toolkit'
import facturas from './slices/facturas'



export default configureStore({
    reducer:{
        facturas
    }
})

