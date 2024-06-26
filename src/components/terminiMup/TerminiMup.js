import React from 'react';
import {useState,useEffect} from 'react';
import axiosConfig from '../../axiosConfig';
import StatistikaTerminiMupChart from '../charts/StatistikaTerminiMupChart';

function TerminiMup() {
    console.log("MUP")
    console.log(localStorage.getItem('mup'))
    const [korisnik,setKorisnik] = useState(null);
    const korisnik1 = JSON.parse(localStorage.getItem('korisnik'));
    const [mup, setMup] = useState(null);
    useEffect(() => {
        setKorisnik(korisnik1);
        if(korisnik1 === null){
            window.location.href = '/login';
        }
        else{
            getMup(korisnik1.mupId);
        }

    }, [])

    function getMup(id){
        axiosConfig.get(`api/mup/${id}`)
        .then((response) => {
            localStorage.setItem('mup',JSON.stringify(response.data));
            setMup(response.data);
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

    if (!mup) {
        return <div>Loading...</div>;
    }


  return (
    <div className='terminiMup'>
        <h1>Termini</h1>
        {mup.termini.map((termin) => (
            <div key={termin.id} className='mup'>
                <p>Vreme: {parseDateandTime(termin.vreme)}</p>
                <p>Status: {termin.status.status}</p>
                <p>TipDokumenta: {termin.tipDokumenta.tipDokumenta}</p>
                <button onClick={() => prihvatiTermin(termin.id)}>Prihvati</button>
                <button onClick={()=>odbijTermin(termin.id)}>Odbij</button>
            </div>
        ))}
        <h1>Statistika Termina</h1>
        <p>Broj termina: {mup.termini.length}</p>
        <p>Broj zahteva: {mup.termini.filter(termin => termin.status.status === 'Zahtev').length}</p>
        <p>Broj zakazanih termina: {mup.termini.filter(termin => termin.status.status === 'Zakazan').length}</p>
        <p>Broj odbijenih termina: {mup.termini.filter(termin => termin.status.status === 'Odbijen').length}</p>

        <StatistikaTerminiMupChart/>
    </div>
  )
}

export default TerminiMup