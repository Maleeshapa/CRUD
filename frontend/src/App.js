import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from '../src/pages/Home';
import Create from '../src/pages/Create';

import 'bootstrap/dist/css/bootstrap.min.css';
import Read from '../src/pages/Read';
import Update from './pages/Update';
import Login from './pages/Login';
import View from './pages/View';
import Emailform from './email/Emailform';




function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element = {<Home/>} />
        <Route path='/create' element = {<Create/>} />
        <Route path='/read/:id' element = {<Read/>} />
        <Route path='/edit/:id' element = {<Update/>} />

        <Route path='/Login' element = {<Login/>} />
        <Route path='/view/:email' element = {<View/>} />



        <Route path='/send-email' element = {<Emailform/>} />
        
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
