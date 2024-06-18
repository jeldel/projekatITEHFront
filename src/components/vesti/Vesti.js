import React from 'react'
import {useState,useEffect} from 'react';
import axiosConfig from '../../axiosConfig';

function Vesti() {
    const urlSveVesti = 'https://newsapi.org/v2/everything?q=Government&from=2023-09-15&sortBy=popularity&apiKey=9f37384f35a54e268dd3c9630c8de2ec';
    const urlSrbija = 'https://newsapi.org/v2/top-headlines?' +
    'country=rs&' +
    'apiKey=9f37384f35a54e268dd3c9630c8de2ec';

    const vesti = JSON.parse(localStorage.getItem('vesti'));


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
            document.location.reload(true);
            return response.data;
        }
        )
    }

  return (
    <div className='vesti'>
        <select id='opcije' defaultValue={"srbija"}>
            <option value="sveVesti">Sve vesti</option>
            <option value="srbija">Srbija</option>
        </select>
        <button onClick={()=>getVesti(document.getElementById("opcije").value)}>Pretrazi</button>
        <div className='vesti-prikaz'>
        {vesti.articles.map((vest) => (
            <div key={vest.id} className='vest'>
                <p>Naslov: {vest.title}</p>
                <p>Autor: {vest.author}</p>
                <p>Link:<a href={vest.url}> Link ka vesti</a> </p>
                <p><img src={vest.urlToImage}/></p>
                <p>Vreme: {vest.publishedAt}</p>
                <p>Izvor: {vest.source.name}</p>
            </div>
        ))}
            </div>
    </div>
  )
}

export default Vesti