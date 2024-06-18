import React from 'react'
import {useState,useEffect} from 'react';

function Home() {
    const [korisnik,setKorisnik] = useState({});
    useEffect(() => {
        const korisnik = JSON.parse(localStorage.getItem('korisnik'));
        setKorisnik(korisnik);
        if(korisnik === null){
            window.location.href = '/login';
        }
        else{
            console.log(korisnik);
        }
    }, [])
if(korisnik){
    return(    
    <div className='home'>
            <div className='uvodni tekst'>
                <h1>Dobrodosli {korisnik.ime} {korisnik.prezime}</h1>
                <p>Na ovom sajtu mozete zakazati termin za MUP</p>
                <p>Ukoliko zelite da zakazete termin kliknite na dugme Zakazi termin</p>
                <p>Ukoliko zelite da pogledate svoje termine kliknite na dugme Moji termini</p>

                <button onClick={()=>{localStorage.clear();window.location.href = '/login';}}>Izlogujte se</button>
            </div>

    </div>
    )
}
}

export default Home