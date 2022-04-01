import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Home = () => {


  const baseURL = "http://localhost:8080/"

  const [data, setdata] = useState([]);
  const [carritoCombra, setCarritoCombra] = useState([]);
  const [valorTotal, setValorTotal] = useState(0);

  useEffect(() => {
    fetch("http://localhost:8080/getproductos", {
      method: "GET",
    })
      .then((reponse) => reponse.json())
      .then((res) => {
        setdata(res);
      })
      .catch((err) => console.log(err));
  }, []);

  
  

  const deleteInv = (articulo) => {
    fetch(`http://localhost:8080/${articulo.id}`, {
      method: "DELETE",
    });
  };

  const postInv = () => {
    fetch(`http://localhost:8080/saveproducto`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombreProducto: "Mema",
        valorProducto: 15,
        cantidadDeProducto: 100,
      }),
    });
  };

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
    <>
      <h1>Articulos</h1>
      <div className="contenedorAriculos">
        {data.map((articulos) => (
          <div className="divArticulos" key={articulos.id}>
            <h4>
              {articulos.nombreProducto} Cantidad:{" "}
              {articulos.cantidadDeProducto}{" "}
            </h4>
            <div className="articulosBotones">
              <div className="d-flex">
                <p className="margin-right">Comprar: </p>
                <div className="numArticulo">
                  <p>{pedido[articulos.nombreProducto]}</p>
                </div>
              </div>
              <div>
                <button
                  className="btn btn-primary"
                  onClick={() => carritoAgregar(articulos)}
                >
                  +1
                </button>
                <button
                  className="btn btn-light"
                  onClick={() => carritoQuitar(articulos)}
                >
                  -1
                </button>
              </div>
            </div>
          </div>
        ))}
        <div className="d-flex justify-content-around">
          <div className="factura">
            <h1>Factura </h1>
            {carritoCombra.map((articulo, index) => (
              <div key={index + articulo.id} className="articulosEnCarrito">
                {articulo.nombreProducto} valor: {articulo.valorProducto}
              </div>
            ))}
          </div>
          <div className="d-flex">
            <h4 className="mt-1 ">Precio Total: {valorTotal}</h4>
            <div>
              <button
                className="btn btn-dark ms-2"
                onClick={ ()=> actualizarInv()}
                
              >
                Comprar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
