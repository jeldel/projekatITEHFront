import React,{useState,useEffect} from 'react';
import './App.css';
import { Route,Routes,Router } from 'react-router-dom';
import Home from './components/home/Home';
import Login from './components/login/Login';
import TerminZakazivanje from './components/terminZakazivanje/TerminZakazivanje';
import Header from './components/header/Header';
import MojiTermini from './components/mojiTermini/MojiTermini';
import TerminiMup from './components/terminiMup/TerminiMup';
import Vesti from './components/vesti/Vesti';
import axiosConfig from './axiosConfig';

function App() {
  const urlSrbija = 'https://newsapi.org/v2/top-headlines?' +
  'country=rs&' +
  'apiKey=9f37384f35a54e268dd3c9630c8de2ec';

  useEffect(() => {
    getVesti('srbija');
}, [])


function getVesti(vrednost){
  var url = '';
  if(vrednost === 'sveVesti'){
      url= urlSveVesti;
  }
  else{
      url = urlSrbija;
  }
  axiosConfig.get(url)
  .then((response) => {
      console.log(response.data);
      localStorage.setItem('vesti',JSON.stringify(response.data));
      console.log(localStorage.getItem('vesti'));
  }
  )
}

  return (

    <div className="App">
      <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/zakazi' element={<TerminZakazivanje />} />
          <Route path='/login' element={<Login />} />
          <Route path='/mojiTermini' element={<MojiTermini />} />
          <Route path="/terminiMup" element={<TerminiMup />} />
          <Route path = '/vesti' element={<Vesti />} />
        </Routes>
    </div>
  );

}

export default App;
