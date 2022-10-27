// react-dom
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// pages and components
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Signup from './pages/Signup'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route 
              path = "/" // home page
              element = {<Home />} // render component
            />
            <Route 
              path = "/login" // login page
              element = {<Login />} // render component
            />
            <Route 
              path = "/signup" // signup page
              element = {<Signup />} // render component
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
