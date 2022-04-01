import { Home } from "./containers/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { HistorialFacturas } from "./containers/HistorialFacturas";

function App() {

  
  

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/historial" element={<HistorialFacturas />} />
      </Routes>
    </Router>
  );
}

export default App;
