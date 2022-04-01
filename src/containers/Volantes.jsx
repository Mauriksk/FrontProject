import React, { useState, useEffect } from 'react'

export const Volantes = () => {

    const [formState, setFormState] = useState({
        name:'',
        gmail:''
    })

    const {name , gmail} = formState

    useEffect(()=>{
        console.log('hey')
    }, [])

    const handleInputChange = ({target})=>{
        setFormState({
            ...formState,
            [target.name]:target.value
        })
    }

  return (
    <div className='container'>
        <h1>Volantes</h1>
            <hr/>
        
        <div className='form-group'>
                <input 
                type="text"
                name="name"
                className="form-control"
                placeholder="Tu Nombre"
                autoComplete="off"
                value={name}
                onChange={handleInputChange}
                />
            </div>

            <div className='form-group'>
                <input 
                type="text"
                name="gmail"
                className="form-control"
                placeholder="Gmail"
                autoComplete="off"
                value={gmail}
                onChange={handleInputChange}
                />
            </div>

    </div>
  )
}
