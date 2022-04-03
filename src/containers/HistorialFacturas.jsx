
import React,{useEffect, useState} from 'react'
//Redux
import { fetchGetFacturas } from '../store/slices/facturas'
import { useDispatch, useSelector } from 'react-redux';
import { TablaDeVolantes } from './TablaDeVolantes';

export const HistorialFacturas = () => {
 
  const { listFacturas } = useSelector( state => state.facturas )
  const dispatch = useDispatch()

  const [paginacion, setPaginacion] = useState(true)

  useEffect(() => {
    //El dispatch es quien ejecuta
    dispatch(fetchGetFacturas())
  }, [dispatch])
  
  return (
    <>

    <div className='d-flex justify-content-center'>
      <button className='mt-2 mx-1 btn  btn-outline-light' onClick={ ()=> setPaginacion(true)} >
        Facturas
      </button>
      <button className='mt-2 mx-1 btn btn-outline-info' onClick={ ()=> setPaginacion(false) } >
        Volantes
      </button >
    </div>

    {
      paginacion ? <div className='container mt-4'>
      <h1 className='text-info mb-3'>Historial de Facturas</h1>
      
      <div className='container'>
      <div className='container border border-white'>
        {
          listFacturas.map((p, index) =>  (
            <div key={index + 1500} className='container mt-5 border border-info'>
              <h3 className='text-white'>Factura</h3>
              {
                p.listaProductos.map((productos, index) => (
                  <div className=' text-white' key={productos.id + index}>
                    <p> {index + 1}- Proucto: {productos.nombreProducto}, valor: {productos.valorProducto}</p>
                  </div>
                ))
              }
              <h6 className='text-info'>Total a pagar { p.totalAPagar }</h6>
            </div>
          ))
        }
      </div>
      </div>
    </div> 
    : <TablaDeVolantes />
    }
    </>
  )
}
