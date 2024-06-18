class MUP{
    constructor(id,naziv,adresa,brojTelefona){
        this.id = id;
        this.naziv = naziv;
        this.adresa = adresa;
        this.brojTelefona = brojTelefona;
    }
    getId(){
        return this.id;
    }
    getNaziv(){
        return this.naziv;
    }
    getAdresa(){
        return this.adresa;
    }
    getBrojTelefona(){
        return this.brojTelefona;
    }
    setId(id){
        this.id = id;
    }
    setNaziv(naziv){
        this.naziv = naziv;
    }
    setAdresa(adresa){
        this.adresa = adresa;
    }
    setBrojTelefona(brojTelefona){
        this.brojTelefona = brojTelefona;
    }
    toString(){
        return this.id + " " + this.naziv + " " + this.adresa + " " + this.brojTelefona;
    }
    
}