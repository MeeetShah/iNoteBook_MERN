import './App.css';
import {
  BrowserRouter as Router,
  Route, Routes
} from "react-router-dom"
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import About from './Components/About'
import Login from './Components/Login';
import Signup from './Components/Signup';

function App() {
  return (
    <>
      <Navbar />
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/logout" element={<Login />}></Route>
        </Routes>
      </Router>

    </>
  );
}

export default App;
