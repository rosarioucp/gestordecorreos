import {Contacto} from "./Contacto";
import {Validacion} from "./Validacion";
export class Agenda {
    private _contactos: Contacto[] = [];

   agregarContacto(contacto: Contacto): void {
    const yaExiste = this._contactos.some(guardado => guardado.mismoContacto(contacto));
    Validacion.validar(!yaExiste, "Ya existe un contacto con esa direccion");
    this._contactos.push(contacto);
    }

    buscarContacto(direccion: string): Contacto | undefined {
        return this._contactos.find(contacto =>contacto.direccion === direccion );
    }

    listarContactos(): Contacto[] {
    return [...this._contactos];
    }

    eliminarContacto(direccion: string): boolean {
    const cantidadAntes = this._contactos.length;
    this._contactos = this._contactos.filter(contacto => contacto.direccion !== direccion);
    return this._contactos.length < cantidadAntes;
    }

    modificarContacto(direccionActual: string, nuevoNombre: string, nuevaDireccion: string): void {
    const existe = this.buscarContacto(direccionActual) !== undefined;
    Validacion.validar(existe, "No existe un contacto con esa direccion");
    const nuevo = new Contacto(nuevoNombre, nuevaDireccion);
    const ocupada = this._contactos.some(guardado => guardado.mismoContacto(nuevo) && guardado.direccion !== direccionActual);
    Validacion.validar(!ocupada, "Ya existe otro contacto con esa direccion");
    this.eliminarContacto(direccionActual);
    this._contactos.push(nuevo);
    }   
}   