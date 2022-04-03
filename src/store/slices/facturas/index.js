import { createSlice } from "@reduxjs/toolkit";

const urlGetFacturas = "http://localhost:8080/getfacturas";
const urlGetProductos = "http://localhost:8080/getproductos";
const urlGetVolantes = "http://localhost:8080/getvolantes";

export const facturasSlice = createSlice({
    name:'facturas',
    initialState:{
        listFacturas:[],
        listProductos:[],
        listaVolantes:[],
    },
    reducers:{
        //El action viene ya configurado gracias al toolkit
        setFacturasList: (state, action) =>{
           state.listFacturas = action.payload;
        },
        setProductosList: (state, action) =>{
            state.listProductos = action.payload;
        },
        setVolantesList: (state, action) =>{
            state.listaVolantes = action.payload;
        }
    }
})

//Tengo que exportarla para que quede vicible el action setFacturasList al fetchGetFacturas
export const { setFacturasList, setProductosList, setVolantesList } = facturasSlice.actions;

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
    return ( dispatch ) =>{
        fetch(urlGetProductos)
            .then(res => res.json())
            .then((res) => {
                dispatch( setProductosList(res) )
            })
            .catch(err => console.log(err))
    }
}

export const fetchGetVolantes = () =>{
    return ( dispatch ) =>{
        fetch(urlGetVolantes)
            .then(res => res.json())
            .then((res) => {
                dispatch( setVolantesList(res) )
            })
            .catch(err => console.log(err))
    }
}

export default facturasSlice.reducer