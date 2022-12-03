import './App.css';
import Login from './pages/login';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { useState } from 'react';
import Home from './pages/home';
import Detail from './pages/detail';
import Search from './pages/search';
import About from './pages/about';

function App() {
  const [isLogged, setIsLogged] = useState(false)
  const [dataBook, setBook] = useState();
  const [dataSearch, setSearch] = useState();

  return (
    <div className='mobile-wrapper'>
      <main>
        <Router>
          <Routes>

            {isLogged ?
              (
                <>
                  <Route path="/" element={<Home dataBook={(data) => setBook(data)} dataSearch={(data) => setSearch(data)}/>}>
                  </Route>

                  <Route path="/detail" element={<Detail book={dataBook} dataBook={(data) => setBook(data)}/>}>
                  </Route>

                  <Route path="/search" element={<Search search={dataSearch} dataBook={(data) => setBook(data)}/>}>
                  </Route>

                  <Route path="/about" element={<About />}>
                  </Route>
                </>
              ) :
              (
                <>
                  <Route path="/" element={<Login action={(data) => setIsLogged(data)}/>}>
                  </Route>
                </>
              )
            }
            
          </Routes>
        </Router>
      </main>
    </div>
  );
}

export default App;
