import MainPage from "./Pages/Main";
import {BrowserRouter as Router, Link, Route, Routes} from "react-router-dom";
import MainHeader from "./Components/MainHeader";
import Admin from "./Pages/Admin";
import "./index.css"
function App() {
  return (
      <Router>
          <div className="container">
              <MainHeader/>
              <nav>
                  <ul>
                      <li>
                          <Link to="/">Главная</Link>
                      </li>
                      <li>
                          <Link to="/admin">Администратор</Link>
                      </li>
                  </ul>
              </nav>

              <Routes >
                  <Route path="/admin" element={<Admin/>}/>
                  <Route path="/" element={<MainPage/>}/>
              </Routes>
          </div>
      </Router>
  );
}

export default App;
