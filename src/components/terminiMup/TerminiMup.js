import React from 'react'
import {useState,useEffect} from 'react';
import axiosConfig from '../../axiosConfig';
import StatistikaTerminiMupChart from '../charts/StatistikaTerminiMupChart';

function TerminiMup() {
    const [korisnik,setKorisnik] = useState(null);
    const korisnik1 = JSON.parse(localStorage.getItem('korisnik'));
    var mup1 = null;
    useEffect(() => {
        setKorisnik(korisnik1);
        if(korisnik1 === null){
            window.location.href = '/login';
        }
        else{
            console.log(mup1);
        }
        getMup(korisnik1.mupId);

    }, [])

    function getMup(id){
        axiosConfig.get(`api/mup/${id}`)
        .then((response) => {
            localStorage.setItem('mup',JSON.stringify(response.data));
            return localStorage.getItem('mup');
        }
        )
    }

    function prihvatiTermin(id){
        axiosConfig.put(`api/termin/${id}/zakazi`)
        .then((response) => {
            console.log(response.data);
            getMup(korisnik1.mupId);
            window.location.reload(true);
        }
        )
    }

    function odbijTermin(id){
        axiosConfig.put(`api/termin/${id}/odbij`)
        .then((response) => {
            console.log(response.data);
            getMup(korisnik1.mupId);
            window.location.reload(true);
        }
        )
    }


    function parseDateandTime(date){
        const date1 = new Date(date);
        const date2 = date1.toLocaleDateString();
        const time = date1.toLocaleTimeString();    
        console.log(date2);
        console.log(time);
        return `${date2} ${time}`;
    }

        


  return (
    <div className='terminiMup'>
        <h1>Termini</h1>
        {JSON.parse(localStorage.getItem('mup')).termini.map((termin) => (
            <div key={termin.id} className='mup'>
                <p>Vreme: {parseDateandTime(termin.vreme)}</p>
                <p>Status: {termin.status.status}</p>
                <p>TipDokumenta: {termin.tipDokumenta.tipDokumenta}</p>
                <button onClick={() => prihvatiTermin(termin.id)}>Prihvati</button>
                <button onClick={()=>odbijTermin(termin.id)}>Odbij</button>
            </div>
        ))}
        <h1>Statistika Termina</h1>
        <p>Broj termina: {JSON.parse(localStorage.getItem('mup')).termini.length}</p>
        <p>Broj zahteva: {JSON.parse(localStorage.getItem('mup')).termini.filter(termin => termin.status.status === 'Zahtev').length}</p>
        <p>Broj zakazanih termina: {JSON.parse(localStorage.getItem('mup')).termini.filter(termin => termin.status.status === 'Zakazan').length}</p>
        <p>Broj odbijenih termina: {JSON.parse(localStorage.getItem('mup')).termini.filter(termin => termin.status.status === 'Odbijen').length}</p>

        <StatistikaTerminiMupChart/>
    </div>
  )
}

export default TerminiMup