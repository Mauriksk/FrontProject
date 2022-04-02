import React, { useState } from 'react'
import firebaseApp from '../firebase/credenciales'
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth'
import { getFirestore, doc, setDoc } from 'firebase/firestore'
import '../styles/styles.scss'
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
        const rol = 'usuario';

        console.log("Submit", email, password, rol)

        if(isRegistrando){
            //registro
            registrarUsuario(email, password, rol)
        }else{
            //login
            signInWithEmailAndPassword(auth, email, password)
        }

    }

  return (

    
    <div className='border border-white  py-5 d-flex flex-column justify-content-center align-items-center container mt-5'>
       <h1 className='text-white'>{ isRegistrando ? "Registrate" : "Inicia sesión" }</h1>

        <form className='  d-flex flex-column justify-content-center align-items-center ' onSubmit={ submitHandler }>

            <div className='container'>
            <label className='px-1 mt-3 text-white' htmlFor="">
                Email :
                <input type="email" id='email' />
            </label>
            <label className='px-1 mt-3 text-white' htmlFor="">
                Password :
                <input type="password" id='password'/>
            </label>
            <div className='d-flex flex-column justify-content-center align-items-center'>
            <label className='mt-3 text-white' htmlFor="">
                Rol : 
                <select id="rol">
                    <option value="admin">Administrador</option>
                    <option value="user">Usuario</option>
                </select>
            </label>
            </div>
            </div>

            <div className=''>
            <input 
            className='mx-2 btnWith mt-5 btn btn-info text-white'
                type="submit" 
                value={ isRegistrando ? "Registrar" : "Iniciar sesión" }
            />
            <button
            className='mx-2 btnWith mt-5 btn btn-outline-light'
            onClick={ ()=> setisRegistrando(!isRegistrando) }
            >
            { isRegistrando ? "Ya tengo una cuenta" : "Registrarme" }
            </button>
            </div>

            
        </form>
        
    </div>     
    
  )
}
