export class Contacto {
    readonly nombre: string;
    readonly direccion: string;
    
    constructor (nombre:string, direccion:string){
        this.nombre= nombre;
        this.direccion= direccion;
    }
}