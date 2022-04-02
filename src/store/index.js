import { configureStore } from '@reduxjs/toolkit'
import facturas from './slices/facturas'



export default configureStore({
    reducer:{
        facturas
    }
})




/*

const fetchApi = async () => {
  const response = await fetch(url)
  const resJSON = await response.json()
  setdata(resJSON)
}

*/