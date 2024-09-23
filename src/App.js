import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Form from "./components/Form";
import Bookedmembers from "./components/Bookedmembers";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/form" element={<Form />}/>
          <Route path="/customers" element={<Bookedmembers />}/>
          <Route path="/" element={<Navigate to={"/form"}/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
