import React, { useState } from 'react'

export const Volantes = () => {

    const [state, setState] = useState('')

  return (
    <div>
        <h1>Volante</h1>


        <label>Martillos</label>
        <input 
            type="number" 
            name="martillo" 
        />
        
    </div>
  )
}
