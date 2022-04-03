import React, { useEffect } from "react";
//redux
import { fetchGetVolantes } from "../store/slices/facturas";
import { useDispatch, useSelector } from "react-redux";

export const TablaDeVolantes = () => {
  const { listaVolantes } = useSelector((state) => state.facturas);

  const dispatchVolantes = useDispatch();

  useEffect(() => {
    //El dispatch es quien ejecuta
    dispatchVolantes(fetchGetVolantes());
  }, [dispatchVolantes]);

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <table className="table">
            <thead>
              <tr>
                <th className="text-info">Id Volante</th>
                <th className="text-info">Monto Total</th>
                <th className="text-info">Cedula</th>
                <th className="text-info">Fecha de entrega</th>
              </tr>
            </thead>
            <tbody>
              {
                listaVolantes.map( volantes => (
                  <tr key={volantes.id + 3000}>
                    <td className="text-info">{ volantes.id }</td>
                    <td className="text-info">${ volantes.valorTotal }</td>
                    <td className="text-info">{ volantes.cedulaProveedor }</td>
                    <td className="text-info">{ volantes.date }</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
