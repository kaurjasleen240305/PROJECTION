import {BrowserRouter,Route,Routes} from "react-router-dom"
import './App.css';
import Dashboard  from './pages/dashboard';
import Login from "./pages/login";
import ProjectBoard from "./pages/project_board";

function App() {
  return (
     <BrowserRouter>
       <Routes>
        <Route path="" element={<Dashboard/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/project/:pid" element={<ProjectBoard/>}/>
       </Routes>
     </BrowserRouter>
  );
}

export default App;
