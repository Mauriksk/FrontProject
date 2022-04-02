import { createSlice } from "@reduxjs/toolkit";

const urlGetFacturas = "http://localhost:8080/getfacturas";
const urlGetProductos = "http://localhost:8080/getproductos";

export const facturasSlice = createSlice({
    name:'facturas',
    initialState:{
        listFacturas:[],
        listProductos:[],
    },
    reducers:{
        //El action viene ya configurado gracias al toolkit
        setFacturasList: (state, action) =>{
           state.listFacturas = action.payload;
        },
        setProductosList: (state, action) =>{
            state.listProductos = action.payload;
         }
    }
})

//Tengo que exportarla para que quede vicible el action setFacturasList al fetchGetFacturas
export const { setFacturasList, setProductosList } = facturasSlice.actions;

export const fetchGetFacturas = () =>{
    //Aca entra el dispatch
    return ( dispatch ) =>{
        fetch(urlGetFacturas)
            .then(res => res.json())
            .then((res) => {
                //En el dispatch le paso el action setFacturasList
                dispatch( setFacturasList(res) )
            })
            .catch(err => console.log(err))
    }
}


export const fetchGetproductos = () =>{

    //Aca entra el dispatch
    return ( dispatch ) =>{
        fetch(urlGetProductos)
            .then(res => res.json())
            .then((res) => {
                //En el dispatch le paso el action setProductosList
                dispatch( setProductosList(res) )
            })
            .catch(err => console.log(err))
    }

}

export default facturasSlice.reducer