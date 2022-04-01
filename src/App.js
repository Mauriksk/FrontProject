import { Home } from "./containers/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { HistorialFacturas } from "./containers/HistorialFacturas";
import { Login } from "./containers/Login";
import { useState } from "react";
import firebaseApp from "./firebase/credenciales";
import { getAuth, onAuthStateChanged } from "firebase/auth"
const auth = getAuth(firebaseApp)


function App() {

  const [user, setUser] = useState(null)

  onAuthStateChanged( auth, (usuarioFirebase)=>{
    if(usuarioFirebase){
      setUser(usuarioFirebase)
    }else{
      setUser(false)
    }
  })
  
  console.log( user)

  return (
    <>
      {
        user ? 
        <Router>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/historial" element={<HistorialFacturas />} />
          </Routes>
        </Router> 
        : <Login />
      }
    </>
  );
}

export default App;
