import React, { useState, useEffect } from 'react'
//redux
import { fetchGetproductos } from '../store/slices/facturas'
import { useDispatch, useSelector } from 'react-redux';


export const Volantes = () => {

    const { listProductos } = useSelector( state => state.facturas )

    const cantidadPintura = listProductos[0].cantidadDeProducto;
    const cantidadBolsaClavos = listProductos[1].cantidadDeProducto;
    const cantidadMartillo = listProductos[2].cantidadDeProducto;
    const cantidadTaladro = listProductos[3].cantidadDeProducto;
    const cantidadbolsaPortland = listProductos[4].cantidadDeProducto;


    const dispatchProductos = useDispatch()

    useEffect(() => {
        dispatchProductos(fetchGetproductos())
        console.log()
    },[dispatchProductos])

    const baseURL = "http://localhost:8080/"
    const pathPostVolantes ="savevolantes"

    const [formState, setFormState] = useState({
        Cedula:'',
        Fecha:'',
        matillo:'',
        BolsaDeClavos: '',
        Pintura: '',
        Taladro: '',
        BolsaDePortland: '',
        valorTotal: ''
    })


    const [arrayList, setarrayList] = useState([''])

    const {
        Cedula,
        Fecha,
        Matillo,
        BolsaDeClavos,
        Pintura,
        Taladro,
        BolsaDePortland,
        valorTotal
    } = formState
    console.log(Cedula, Matillo)

    useEffect(()=>{
        console.log('hey')
    }, [])

    const handleInputChange = ({target})=>{
        setFormState({
            ...formState,
            [target.name]:target.value
        })
    }
    

    const postVolantes = () => {

        setarrayList([
            {Martillos: Matillo,},
            {BolsaDeClavos: BolsaDeClavos},
            {Pintura: Pintura},
            {Taladro: Taladro},
            {BolsaDePortland: BolsaDePortland},
        ])

        fetch(`${baseURL}${pathPostVolantes}`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
              "listaProductos":arrayList,
              "date": Fecha,
              "cedulaProveedor":Cedula,
              "valorTotal": valorTotal
          }),
        });
        actualizarInventario()
      };


    const actualizarInventario = () => {
        
        fetch(`${baseURL}actualizarproducto/7b1da9ce-4`, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: listProductos[0].id,
                nombreProducto: listProductos[0].nombreProducto,
                valorProducto: listProductos[0].valorProducto,
                cantidadDeProducto: cantidadPintura + parseInt(Pintura),
            }),
        })
            .then((data) => console.log(data))
            .catch((err) => console.log(err));

            fetch(`${baseURL}actualizarproducto/dce27561-8`, {
                method: "PUT",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: listProductos[1].id,
                    nombreProducto: listProductos[1].nombreProducto,
                    valorProducto: listProductos[1].valorProducto,
                    cantidadDeProducto: cantidadBolsaClavos + parseInt(BolsaDeClavos),
                }),
            })
                .then((data) => console.log(data))
                .catch((err) => console.log(err));
                
            fetch(`${baseURL}actualizarproducto/7a6ba0d3-b`, {
                    method: "PUT",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        id: listProductos[2].id,
                        nombreProducto: listProductos[2].nombreProducto,
                        valorProducto: listProductos[2].valorProducto,
                        cantidadDeProducto: cantidadMartillo + parseInt(Matillo),
                    }),
                })
                    .then((data) => console.log(data))
                    .catch((err) => console.log(err));   

            fetch(`${baseURL}actualizarproducto/b445d4b3-6`, {
                        method: "PUT",
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            id: listProductos[3].id,
                            nombreProducto: listProductos[3].nombreProducto,
                            valorProducto: listProductos[3].valorProducto,
                            cantidadDeProducto: cantidadTaladro + parseInt(Taladro),
                        }),
                    })
                        .then((data) => console.log(data))
                        .catch((err) => console.log(err));

            fetch(`${baseURL}actualizarproducto/1f27699b-5`, {
                    method: "PUT",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        id: listProductos[4].id,
                        nombreProducto: listProductos[4].nombreProducto,
                        valorProducto: listProductos[4].valorProducto,
                        cantidadDeProducto: cantidadbolsaPortland + parseInt(BolsaDePortland),
                            }),
                    })
                        .then((data) => console.log(data))
                        .catch((err) => console.log(err));
    }




  return (
    <div className='container'>
        <div className='d-flex justify-content-center'>
            <h1 className='text-info'>Volantes</h1>
        </div>
            
        
            <h5 className='text-info'>Cedula del Vendedor</h5>
            <div className='mb-2 form-group'>
                <input 
                type="text"
                name="Cedula"
                className="form-control"
                placeholder="Cedula"
                autoComplete="off"
                value={Cedula}
                onChange={handleInputChange}
                />
            </div>

            <h5 className='text-info'>Fecha</h5>
            <div className='mb-2 form-group'>
                <input 
                type="text"
                name="Fecha"
                className="form-control"
                placeholder="Fecha"
                autoComplete="off"
                value={Fecha}
                onChange={handleInputChange}
                />
            </div>

            <h5 className='text-info'>Martillos</h5>
            <div className='mb-2 form-group'>
                <input 
                type="number"
                name="Matillo"
                className="form-control"
                placeholder="Nro-Martillos"
                autoComplete="off"
                value={Matillo}
                onChange={handleInputChange}
                />
            </div>

            <h5 className='text-info'>Bolas de clavos</h5>
            <div className='mb-2 form-group'>
                <input 
                type="number"
                name="BolsaDeClavos"
                className="form-control"
                placeholder="Nro-Bolsa De Clavos"
                autoComplete="off"
                value={BolsaDeClavos}
                onChange={handleInputChange}
                />
            </div>

            <h5 className='text-info'>Pinturas</h5>
            <div className='mb-2 form-group'>
                <input 
                type="number"
                name="Pintura"
                className="form-control"
                placeholder="Nro-Pintura"
                autoComplete="off"
                value={Pintura}
                onChange={handleInputChange}
                />
            </div>

            <h5 className='text-info'>Taladros</h5>
            <div className='mb-2 form-group'>
                <input 
                type="number"
                name="Taladro"
                className="form-control"
                placeholder="Nro-Taladros"
                autoComplete="off"
                value={Taladro}
                onChange={handleInputChange}
                />
            </div>

            <h5 className='text-info'>Bolsas de Portlan</h5>
            <div className='mb-2 form-group'>
                <input 
                type="number"
                name="BolsaDePortland"
                className="form-control"
                placeholder="Nro-Bolsas De Portland"
                autoComplete="off"
                value={BolsaDePortland}
                onChange={handleInputChange}
                />
            </div>

            <h5 className='text-info'>Valor Total de la compra</h5>
            <div className='mb-2 form-group'>
                <input 
                type="number"
                name="valorTotal"
                className="form-control"
                placeholder="Valor total de la compra"
                autoComplete="off"
                value={valorTotal}
                onChange={handleInputChange}
                />
            </div>

            <div className='mt-3 d-flex justify-content-center'>
                <button onClick={ ()=> postVolantes() } className='btn btn-outline-info '>
                    Guardar
                </button>
            </div>
    </div>
    )
}
