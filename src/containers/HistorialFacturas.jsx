
import React,{useEffect, useState} from 'react'

export const HistorialFacturas = () => {

  const [ data, setdata] = useState([]);
  
const url = "http://localhost:8080/getfacturas";


const fetchApi = async () => {
  const response = await fetch(url)
  const resJSON = await response.json()
  setdata(resJSON)
}

useEffect(() => {
  fetchApi()
}, [])

//console.log(data)



  return (
    <div className='container mt-5'>
      <h1>Historial de Facturas</h1>
      
      <div className='container'>
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