import React, { useEffect, useState } from 'react'

export const Home = () => {

    const [data, setdata] = useState([])
    const [pedido, setPedido] = useState({
        "Bolsa de Clavos":0,
        "Martillo":0,
        "Pintura":0,
        "Taladro":0,
        'Bolsa de Portland':0
    })


    useEffect(() => {
        fetch('http://localhost:8080/getproductos', {
          method:'GET'
        })
        .then(reponse => reponse.json())
        .then( res => {
            
            setdata(res)
        })
        .catch(err=> console.log(err))
      }, [])

      console.log(data.map(p => p.id))
  return (
    <>
        <h1>Articulos</h1>
        <div className='contenedorAriculos'>
        {
          data.map(articulos => (
                <div className='divArticulos' key={articulos.id}>
                    <h4>{articulos.nombreProducto} Cantidad: { articulos.cantidadDeProducto } </h4>
                    <div className="articulosBotones"> 
                    <div className='d-flex'>
                        <p className='margin-right'>Comprar: </p>
                        <div className="numArticulo"><p>{ pedido[articulos.nombreProducto] }</p></div> 
                    </div>
                    <div>
                        <button className='btn btn-primary' onClick={()=> setPedido({
                            ...pedido,
                            [articulos.nombreProducto]: pedido[articulos.nombreProducto] +1 
                        })}>+1</button>
                        <button className='btn btn-light' onClick={()=> setPedido({
                            ...pedido,
                            [articulos.nombreProducto]: pedido[articulos.nombreProducto] -1 
                        })}>-1</button>
                    </div>
                    </div>
                </div>
            )
            )
        }
        </div>
        
    </>
  )
}
