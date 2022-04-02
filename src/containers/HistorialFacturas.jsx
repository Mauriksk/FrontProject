
import React,{useEffect} from 'react'
//Redux
import { fetchGetFacturas } from '../store/slices/facturas'
import { useDispatch, useSelector } from 'react-redux';

export const HistorialFacturas = () => {
 
  const { listFacturas } = useSelector( state => state.facturas )

  //console.log(listFacturas)
  const dispatch = useDispatch()

  useEffect(() => {
    //El dispatch es quien ejecuta

    dispatch(fetchGetFacturas())
  }, [dispatch])
  


  return (
    <div className='container mt-4'>
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
          ) )
        }
      </div>
        
      </div>
      
    </div>
  )
}

/*
<div className='container'>
        {
          data.map((p, index) =>  (
            <div key={index + 1500} className='container mt-5'>
              <h3>Factura</h3>
              {
                p.listaProductos.map((productos, index) => (
                  <div key={productos.id + index}>
                    <p> {index + 1}- Proucto: {productos.nombreProducto}, valor: {productos.valorProducto}</p>
                  </div>
                ))
              }
              <h6>Total a pagar { p.totalAPagar }</h6>
            </div>
          ) )
        }
      </div>
      { verPDF ? <p>PDF</p> : null}

*/