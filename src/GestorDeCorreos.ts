import { Bandeja } from "./Bandeja";
import { Correo } from "./Correo";
import { Validacion } from "./Validacion";

export class GestorDeCorreos {
  private readonly _entrada = new Bandeja("Entrada");
  private _borradores = new Bandeja("Borradores");
  private _enviados = new Bandeja("Enviados");

  recibirCorreo(correo: Correo): void {
    this._entrada.agregar(correo);
  }

  guardarBorrador(correo: Correo): void {
    Validacion.validar(!this._enviados.contiene(correo), "El correo ya fue enviado");
    this._borradores.agregar(correo);
  }

  enviar(correo: Correo): void {
    Validacion.validar(!this._enviados.contiene(correo), "El correo ya fue enviado");
    Validacion.validar(correo.remitente !== undefined, "Ingrese un remitente valido");
    Validacion.validar(correo.asunto.trim() !== "", "Ingrese un asunto valido");
    Validacion.validar(correo.verDestinatarios().length > 0, "Ingrese al menos un destinatario");
    this._borradores.quitar(correo);
    this._enviados.agregar(correo);
  }

  verEntrada(): Correo[] {
    return this._entrada.verCorreos();
  }

  verBorradores(): Correo[] {
    return this._borradores.verCorreos();
  }

  verEnviados(): Correo[] {
    return this._enviados.verCorreos();
  }
}
