export class Contacto {
    readonly nombre: string;
    readonly direccion: string;
    
    constructor (nombre:string, direccion:string){
        this.nombre= nombre.trim().toLowerCase();
        this.direccion= direccion.trim().toLowerCase();
    }
}