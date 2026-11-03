import {Contacto} from "./Contacto";

export class Agenda {
    private contactos: Contacto[] = [];


    agregarContacto(contacto:Contacto): void{
     this.contactos.push(contacto);
    }

    buscarContacto(direccion: string): Contacto | undefined {
        return this.contactos.find(contacto =>contacto.direccion === direccion );
    }
}   