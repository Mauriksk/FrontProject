import React, { useEffect, useState } from "react";
import { fetchGetproductos } from '../store/slices/facturas'
import { useDispatch, useSelector } from 'react-redux';

export const Home = () => {

  const { listProductos } = useSelector( state => state.facturas )

  const dispatchProductos = useDispatch()

  useEffect(() => {
    //El dispatch es quien ejecuta
    dispatchProductos(fetchGetproductos())
  }, [dispatchProductos])
  


  const baseURL = "http://localhost:8080/"

  const [carritoCombra, setCarritoCombra] = useState([]);
  const [valorTotal, setValorTotal] = useState(0);
  

  const [pedido, setPedido] = useState({
    "Bolsa de Clavos": 0,
    Martillo: 0,
    Pintura: 0,
    Taladro: 0,
    "Bolsa de Portland": 0,
  });

  const actualizarInv = () => {

    carritoCombra.map((n) => {
      fetch(`${baseURL}actualizarproducto/${n.id}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: n.id,
          nombreProducto: n.nombreProducto,
          valorProducto: n.valorProducto,
          cantidadDeProducto: n.cantidadDeProducto - pedido[n.nombreProducto],
        }),
      })
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
    });

    postFactura()
  };

  

  const carritoAgregar = (articulo) => {
    if (pedido[articulo.nombreProducto] < articulo.cantidadDeProducto) {
      setPedido({
        ...pedido,
        [articulo.nombreProducto]: pedido[articulo.nombreProducto] + 1,
      });

      setCarritoCombra([
        ...carritoCombra,
        {
          nombreProducto: articulo.nombreProducto,
          cantidadDeProducto: articulo.cantidadDeProducto,
          valorProducto: articulo.valorProducto,
          id: articulo.id,
        },
      ]);

      setValorTotal(valorTotal + articulo.valorProducto);
    }
  };


  useEffect(() => {
    console.log(carritoCombra);
  }, [carritoCombra]);

  const carritoQuitar = (articulo) => {
    if (pedido[articulo.nombreProducto] > 0) {
      setPedido({
        ...pedido,
        [articulo.nombreProducto]: pedido[articulo.nombreProducto] - 1,
      });
    }
  };

  // Factura

  const postFactura = () => {
    fetch(`${baseURL}savefactura`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
          "fecha":null,
          "consecutivoFactura":null,
          "nombreCliente":null,
          "listaProductos":carritoCombra,
          "funcionarioQueAtendio":"Raul",
          "totalAPagar":valorTotal
      }),
    });
  };

  return (
    <div className="container">
      <div className="container mt-4">
        {listProductos.map((articulos) => (
          <div className="border border-info mt-3 bg-dark bg-gradient px-5 py-1" key={articulos.id}>
            <h4 className="text-white">
              {articulos.nombreProducto} Cantidad:{" "}
              {articulos.cantidadDeProducto}{" "}
            </h4>
            <div className="articulosBotones">
              <div className="d-flex">
                <p className="text-white margin-right">Comprar: </p>
                <div className="text-info">
                  <p>{pedido[articulos.nombreProducto]}</p>
                </div>
              </div>
              <div>
                <button
                  className="btn btn-outline-info text-white"
                  onClick={() => carritoAgregar(articulos)}
                >
                  +1
                </button>
                <button
                  className="btn btn-outline-info text-white"
                  onClick={() => carritoQuitar(articulos)}
                >
                  -1
                </button>
              </div>
            </div>
          </div>
        ))}
        <div className="d-flex justify-content-around mt-5">
          <div className="text-white">
            <h1 className="text-white ">Factura </h1>
            {carritoCombra.map((articulo, index) => (
              <div key={index + articulo.id} className="text-white border border-info mt-2 px-2 py-2">
                {articulo.nombreProducto} valor: {articulo.valorProducto}
              </div>
            ))}
          </div>
          <div className="d-flex">
            <h4 className="mt-1 text-white">Precio Total: {valorTotal}</h4>
            <div>
              <button
                className="btn btn-outline-info ms-2 text-white"
                onClick={ ()=> actualizarInv()}  
              >
                Comprar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
