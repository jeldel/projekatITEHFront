import React from 'react'
import axiosConfig from '../../axiosConfig';
import { Korisnik } from '../../classes/Korisnik';


function Login() {

    function sendLoginInfo(){
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        console.log(email);
        console.log(password);
        axiosConfig.post('api/korisnik/login',{
            email: email,
            sifra: password
            }
            )
            .then((response) => {
                console.log(response);
                console.log(response.data);
                console.log(response.data.id);
                console.log(JSON.stringify(response.data));
                localStorage.setItem('korisnik',JSON.stringify(response.data));
                if(response.data.admin === true){
                    getMup(response.data.mupId);
                    window.location.href = '/terminiMup';
                }
                window.location.href = '/';
            }
            )
            .catch((error) => {
                console.log(error);
                window.alert('Pogresan email ili sifra');
            }
            );

    }

    function sendRegistrationInfo(){
        const ime = document.getElementById('imeReg').value;
        const prezime = document.getElementById('prezimeReg').value;
        const email = document.getElementById('emailReg').value;
        const password = document.getElementById('passwordReg').value;
        const registracija = new Korisnik(0,ime,prezime,email,password,"adresa",false);
        console.log(registracija);
        console.log(JSON.stringify(registracija));
        axiosConfig.post('api/korisnik/register',JSON.stringify(registracija)
            )
            .then((response) => {
                console.log(response);
                console.log(response.data);
                console.log(response.data.id);
                console.log(JSON.stringify(response.data));
                localStorage.setItem('korisnik',JSON.stringify(response.data));
                window.location.href = '/';
            }
            )
            .catch((error) => {
                console.log(error);
                window.alert(error.response);
            }
            );
        }

        function getMup(id){
            axiosConfig.get(`api/mup/${id}`)
            .then((response) => {
                localStorage.setItem('mup',JSON.stringify(response.data));
                return localStorage.getItem('mup');
            }
            )
        }

    
  return (
            
    <div className='login'>
        <h1>Login</h1>
        <form>
            <label htmlFor="email">Email</label>
            <input type="text" name="email" id="email" />
            <label htmlFor="password">Sifra</label>
            <input type="password" name="password" id="password" />
            <button type='button' id='login' onClick={()=>sendLoginInfo()}>Login</button>
        </form>
        <h1>Registracija</h1>
        <form>
            <label htmlFor="ime">Ime</label>
            <input type="text" name="ime" id="imeReg" />
            <label htmlFor="prezime">Prezime</label>
            <input type="text" name="prezime" id="prezimeReg" />
            <label htmlFor="emailReg">Email</label>
            <input type="text" name="emailReg" id="emailReg" />
            <label htmlFor="passwordReg">Sifra</label>
            <input type="password" name="passwordReg" id="passwordReg" />
            <button type='button' id='registracija' onClick={()=>sendRegistrationInfo()}>Registracija</button>
        </form>
    </div>
  )
}

export default Login