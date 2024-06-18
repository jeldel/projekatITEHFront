export class Korisnik{
    constructor(id,ime,prezime,email,sifra){
        this.id = id;
        this.ime = ime;
        this.prezime = prezime;
        this.email = email;
        this.sifra = sifra;
        this.admin=false;
    }
    getId(){
        return this.id;
    }
    getIme(){
        return this.ime;
    }
    getPrezime(){
        return this.prezime;
    }
    getEmail(){
        return this.email;
    }
    getSifra(){
        return this.sifra;
    }
    setId(id){
        this.id = id;
    }
    setIme(ime){
        this.ime = ime;
    }
    setPrezime(prezime){
        this.prezime = prezime;
    }
    setEmail(email){
        this.email = email;
    }
    setSifra(sifra){
        this.sifra = sifra;
    }
    toString(){
        return this.id + " " + this.ime + " " + this.prezime + " " + this.email + " " + this.lozinka;
    }
    
}