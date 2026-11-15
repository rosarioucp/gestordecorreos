import type { Contacto } from "./Contacto";
import type { Correo } from "./Correo";
import { GestorDeCorreos } from "./GestorDeCorreos";
import { Validacion } from "./Validacion";

export class ServidorDeCorreo {
  private _gestores = new Map<string, GestorDeCorreos>();

  registrar(contacto: Contacto): GestorDeCorreos {
    const yaRegistrado = this._gestores.has(contacto.direccion);
    Validacion.validar(!yaRegistrado, "El usuario ya esta registrado");

    const gestor = new GestorDeCorreos();
    this._gestores.set(contacto.direccion, gestor);

    return gestor;
  }

  gestorDe(contacto: Contacto | undefined): GestorDeCorreos {
    Validacion.validar(contacto !== undefined, "El usuario no esta registrado");

    const gestor = this._gestores.get(contacto!.direccion);
    Validacion.validar(gestor !== undefined, "El usuario no esta registrado");

    return gestor!;
  }

  enviar(correo: Correo): void {
    const gestorRemitente = this.gestorDe(correo.remitente);
    const gestoresDestino = correo.verDestinatarios().map(
      destinatario => this.gestorDe(destinatario)
    );

    gestorRemitente.enviar(correo);

    gestoresDestino.forEach(gestor => {
      const copia = correo.copiar();
      gestor.recibirCorreo(copia);
    });
  }
}
