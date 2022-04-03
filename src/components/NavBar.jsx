import React from "react";
import { Link } from "react-router-dom";
import firebaseApp from "../firebase/credenciales";
import { getAuth, signOut } from 'firebase/auth'
const auth = getAuth(firebaseApp)

export const NavBar = () => {

  

  return (
    <div className="">
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <div className="container-fluid ">
          <Link className="navbar-brand" to="/">
            Ferreteria lo de Raul
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse displa" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/historial">
                  Historial
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/volantes">
                  Volantes
                </Link>
              </li>
              

            </ul>
            
          </div>
          <div className="d-flex justify-content-end">
                <li className="nav-item" >
                  <button onClick={()=> signOut(auth)} className="btn btn-outline-info ">Salir</button>
                </li>
              </div>
        </div>
      </nav>
    </div>
  );
};
