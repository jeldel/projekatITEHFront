export class Termin{
    constructor(vreme,mupId,korisnikId,tipDokumenta) {
        this.vreme =vreme;
        this.mupId = mupId;
        this.korisnikId = korisnikId;
        this.tipDokumenta = tipDokumenta;
    }
    getVreme(){
        return this.vreme;
    }
    setVreme(vreme){
        this.vreme = vreme;
    }


    getMupId(){
        return this.mupId;
    }
    setMupId(mupId){
        this.mupId = mupId;
    }
    getKorisnikId(){
        return this.korisnikId;
    }
    setKorisnikId(korisnikId){
        this.korisnikId = korisnikId;
    }
    getTipDokumenta(){
        return this.tipDokumenta;
    }
    setTipDokumenta(tipDokumenta){
        this.tipDokumenta = tipDokumenta;
    }
    
    toString(){
        return this.datum;
    }


    
}