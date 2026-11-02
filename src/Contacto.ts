import { Validacion} from "./Validacion";

export class Contacto {
    readonly nombre: string;
    readonly direccion: string;
    
    constructor (nombre:string, direccion:string){
        this.nombre= nombre;
        this.direccion= direccion.trim().toLowerCase();
        Validacion.validar(this.direccion.includes("@"), "Falta el arroba en la direccion");
        Validacion.validar(this.direccion.includes("."), "Falta el punto en la direccion");     
    }
}