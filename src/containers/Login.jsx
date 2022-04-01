import React, { useState } from 'react'
import firebaseApp from '../firebase/credenciales'
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth'
import { getFirestore, doc, setDoc } from 'firebase/firestore'
const auth = getAuth(firebaseApp)


export const Login = () => {
    
    const [isRegistrando, setisRegistrando] = useState(false)

    const firestore = getFirestore(firebaseApp)
    const registrarUsuario = async (email, password, rol)=>{
        const infoUsuario = await createUserWithEmailAndPassword(auth, email, password)
        .then( (usuarioFirebase) => usuarioFirebase )

        console.log(infoUsuario.user.uid)
        const docuRef =  doc(firestore, `usuarios/${infoUsuario.user.uid}` )
        setDoc(docuRef, {
            correo: email,
            rol: rol,
        })
    }


    const submitHandler = (e) => {
        e.preventDefault()

        const email = e.target.elements.email.value;
        const password = e.target.elements.password.value;
        const rol = e.target.elements.rol.value;

        console.log("Submit", email, password, rol)

        if(isRegistrando){
            registrarUsuario(email, password, rol)
        }else{
            //login
        }

    }

  return (
    <div>
        <h1>{ isRegistrando ? "Registrate" : "Inicia sesión" }</h1>

        <form onSubmit={ submitHandler }>
            <label htmlFor="">
                Email :
                <input type="email" id='email' />
            </label>
            <label htmlFor="">
                Password
                <input type="password" id='password'/>
            </label>
            <label htmlFor="">
                Rol:
                <select id="rol">
                    <option value="admin">Administrador</option>
                    <option value="user">Usuario</option>
                </select>
            </label>

            <input 
                type="submit" 
                value={ isRegistrando ? "Registrar" : "Iniciar sesión" }
            />
        </form>
        <button
            onClick={ ()=> setisRegistrando(!isRegistrando) }
        >
            { isRegistrando ? "Ya tengo una cuenta" : "Registrarme" }
        </button>
    </div>     
  )
}
