import React from 'react'
import {useState,useEffect} from 'react';
import axiosConfig from '../../axiosConfig';

function NovaStranica() {
    const [korisnik,setKorisnik] = useState({});
    const korisnik1 = JSON.parse(localStorage.getItem('korisnik'));
    useEffect(() => {
        if(korisnik1 === null){
            window.location.href = '/login';
        }
        else{
            console.log(korisnik1);
            setKorisnik(korisnik1);
        }
    }, [])
    let mupovi = [];
    const getMupovi = async () => {
        const {data} = await axiosConfig.get('api/mup');
        mupovi = data;
        console.log(data);
    }
    getMupovi();
  return (
    <div>
        <h1>Nova Stranica</h1>

    </div>
  )
}

export default NovaStranica