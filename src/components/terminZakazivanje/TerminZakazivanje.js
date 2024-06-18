import React from 'react'
import {useState,useEffect} from 'react';
import axiosConfig from '../../axiosConfig';
import { Termin } from '../../classes/Termin';


function TerminZakazivanje() {
    const [korisnik,setKorisnik] = useState({});
    const [mupovi,setMupovi] = useState([]);
    const korisnik1 = JSON.parse(localStorage.getItem('korisnik'));
    useEffect(() => {
        if(korisnik1 === null){
            window.location.href = '/login';
        }
        else{
            console.log(korisnik1);
            setKorisnik(korisnik1);
        }
        const getMupovi = async () => {
            const {data} = await axiosConfig.get('api/mup');
            setMupovi(data);
            console.log(data);
        }
        getMupovi();
    }, [])
    
    function rezervisiTermin(){
        const selectedDate = document.getElementById('datum').value;
        const selectedTime = document.getElementById('vreme').value;
        const termin = new Termin(`${selectedDate}T${selectedTime}`,document.getElementById("mup").value,korisnik.id,document.getElementById("dokument").value);
        console.log(termin);
        const terminJSON = JSON.stringify(termin);
        console.log(terminJSON);
        axiosConfig.post('api/korisnik/zahtev',terminJSON,{
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            console.log(response);
            if(response.status === 200){
                alert("Uspesno ste zakazali termin");
                axiosConfig.post('api/korisnik/login',{
                    email: korisnik1.email,
                    sifra: korisnik1.sifra
                    }
                    )
                    .then((response) => {
                        localStorage.setItem('korisnik',JSON.stringify(response.data));
                        korisnik1 = JSON.parse(localStorage.getItem('korisnik'));
                    }
                    )
                    .catch((error) => {
                        console.log(error);
                    }
                    );
            }
            else{
                alert("Doslo je do greske");
            }
        }
        ).catch((error) => {
            console.log(error);
        }
        );

    }    
    
    
      return (
        
        <div className="terminZakazivanje">
            <h1>Termin Zakazivanje</h1>
            <p>Odaberite MUP gde zelite da izvadite dokument</p>
            <select id='mup'>
                {mupovi.map((mup) => (
                    <option value={mup.id}>{mup.naziv}</option>
                ))}
            </select>
            <p>Odaberite datum</p>
            <input type="date" id="datum" name="datum" min="2024-04-29" max="2024-12-31"></input>
            <p>Odaberite vreme</p>
            <input type="time" id="vreme" name="vreme" min="09:00" max="17:00"></input>
            <p>Odaberite dokument</p>
            <select id='dokument'>
                <option value="LicnaKarta">Licna karta</option>
                <option value="Pasos">Pasos</option>
                <option value="VozackaDozvola">Vozacka dozvola</option>
            </select>
            <button onClick={()=>rezervisiTermin()}>Rezervisi termin</button>
                   
        </div>
      )
}

export default TerminZakazivanje