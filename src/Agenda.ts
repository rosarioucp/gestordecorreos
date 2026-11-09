import {Contacto} from "./Contacto";
import {Validacion} from "./Validacion";
export class Agenda {
    private contactos: Contacto[] = [];


   agregarContacto(contacto: Contacto): void {
    const yaExiste = this.contactos.some(c => c.mismoContacto(contacto));
    Validacion.validar(!yaExiste, "Ya existe un contacto con esa direccion");
    this.contactos.push(contacto);
    }

    buscarContacto(direccion: string): Contacto | undefined {
        return this.contactos.find(contacto =>contacto.direccion === direccion );
    }

    listarContactos(): Contacto[] {
    return [...this.contactos];
    }

    eliminarContacto(direccion: string): boolean {
    const cantidadAntes = this.contactos.length;
    this.contactos = this.contactos.filter(contacto => contacto.direccion !== direccion);
    return this.contactos.length < cantidadAntes;
    }

    modificarContacto(direccionActual: string, nuevoNombre: string, nuevaDireccion: string): void {
    const existe = this.buscarContacto(direccionActual) !== undefined;
    Validacion.validar(existe, "No existe un contacto con esa direccion");

    const nuevo = new Contacto(nuevoNombre, nuevaDireccion);

    const ocupada = this.contactos.some(c => c.mismoContacto(nuevo) && c.direccion !== direccionActual);
    Validacion.validar(!ocupada, "Ya existe otro contacto con esa direccion");

    this.eliminarContacto(direccionActual);
    this.contactos.push(nuevo);
    }   
}   