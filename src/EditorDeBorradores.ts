import type { Bandeja } from "./Bandeja";
import type { Contacto } from "./Contacto";
import { buscarCorreoPorId } from "./Busqueda";
import { Correo } from "./Correo";
import { Validacion } from "./Validacion";

export class EditorDeBorradores {
  private _borradores: Bandeja;

  constructor(borradores: Bandeja) {
    this._borradores = borradores;
  }

  redactar(
    remitente: Contacto,
    asunto: string = "",
    cuerpo: string = "",
    destinatarios: Contacto[] = []
  ): Correo {
    const borrador = new Correo(remitente, asunto, cuerpo);
    destinatarios.forEach(contacto => {
      borrador.agregarDestinatario(contacto);
    });
    this._borradores.agregar(borrador);

    return borrador;
  }

  recuperar(id: number): Correo | undefined {
    return buscarCorreoPorId(this._borradores.verCorreos(), id);
  }

  cambiarAsunto(id: number, asunto: string): void {
    const borrador = this.borradorPropio(id);
    borrador.cambiarAsunto(asunto);
  }

  cambiarCuerpo(id: number, cuerpo: string): void {
    const borrador = this.borradorPropio(id);
    borrador.cambiarCuerpo(cuerpo);
  }

  agregarDestinatario(id: number, contacto: Contacto): void {
    const borrador = this.borradorPropio(id);
    borrador.agregarDestinatario(contacto);
  }

  quitarDestinatario(id: number, contacto: Contacto): void {
    const borrador = this.borradorPropio(id);
    borrador.quitarDestinatario(contacto);
  }

  private borradorPropio(id: number): Correo {
    const borrador = this.recuperar(id);
    Validacion.validar(borrador !== undefined, "Solo se pueden editar borradores");

    return borrador!;
  }
}
