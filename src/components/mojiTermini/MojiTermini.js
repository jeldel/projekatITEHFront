
import React from 'react'
import {useState,useEffect} from 'react';
import axiosConfig from '../../axiosConfig';


function MojiTermini() {
    const [korisnik,setKorisnik] = useState(null);
    const korisnik1 = JSON.parse(localStorage.getItem('korisnik'));
    const [termini,setTermini] = useState(korisnik1.termini);

    useEffect(() => {
        setKorisnik(korisnik1);
        if(korisnik1 === null){
            window.location.href = '/login';
        }
        else{
        }
    }, [])

    function getMupName(id){
        axiosConfig.get(`api/mup/${id}`)
        .then((response) => {

            var naziv = response.data.naziv;
            console.log(naziv);
            return String(naziv);
        }
        )
    }

    function parseDateandTime(date){
        var datum = new Date(date);
        var date = datum.toDateString();
        var time = datum.toLocaleTimeString();
        time = time.slice(0,-6)+time.slice(-3);
        return `${date} ${time}`;
    }

    function getTermini(vrednost){
            if(vrednost === 'zakazani'){
                setTermini(korisnik1.termini.filter(termin => termin.status.status === 'Zakazan'));
            }
            else if(vrednost === 'zahtevi'){
                setTermini(korisnik1.termini.filter(termin => termin.status.status === 'Zahtev'));
            }
            else{
                setTermini(korisnik1.termini);
            }
            console.log(termini);
    }  

    function refreshKorisnikTermini(){
        axiosConfig.get(`api/korisnik/${korisnik1.id}/termini`)
        .then((response) => {
            console.log(response.data);
            setTermini(response.data);
            korisnik1.termini = response.data;
            localStorage.setItem('korisnik',JSON.stringify(korisnik1));
        })
    }

    function obrisiTermin(id){
        axiosConfig.delete(`api/termin/${id}`)
        .then((response) => {
            console.log(response.data);
            refreshKorisnikTermini();
        })
    }

    function ispisiPravilnoTipDokumenta(tipDokumenta){
        console.log(tipDokumenta);
        if(tipDokumenta === "LicnaKarta"){
            return 'Licna karta';
        }
        else if(tipDokumenta === "Pasos"){
            return 'Pasos';
        }
        else{
            return 'Vozacka dozvola';
        }
    }


 if (korisnik1){
    return (
        <div className='mojiTermini'> 
            <h1>MojiTermini</h1>
            <div className='mupovi'>
                <select id="filter" defaultValue={"sve"}>
                    <option value="sve">Svi termini</option>
                    <option value="zakazani">Zakazani</option>
                    <option value="zahtevi">Zahtevi</option>
                </select>
                <button onClick={()=>getTermini(document.getElementById("filter").value)}>Pretrazi</button>
            {termini.map((termin) => (
                <div key={termin.id} className='mup'>
                    <p>Vreme: {parseDateandTime(termin.vreme)}</p>
                    <p>Status: {termin.status.status}</p>
                    <p>TipDokumenta: {ispisiPravilnoTipDokumenta(termin.tipDokumenta.tipDokumenta) }</p>
                    <button onClick={()=>obrisiTermin(termin.id)}>Obrisi</button>
                </div>
                        
                    ))}
            </div>
            <button onClick={()=>refreshKorisnikTermini()}>Osvezi</button>
        </div>
      )
 } 
}

export default MojiTermini