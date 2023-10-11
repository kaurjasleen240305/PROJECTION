import {BrowserRouter,Route,Routes} from "react-router-dom"
import './App.css';
import Dashboard  from './pages/dashboard';
import Login from "./pages/login";

function App() {
  return (
     <BrowserRouter>
       <Routes>
        <Route path="" element={<Dashboard/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
       </Routes>
     </BrowserRouter>
  );
}

export default App;
