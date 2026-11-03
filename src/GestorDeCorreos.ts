import { Bandeja } from "./Bandeja";
import { Correo } from "./Correo";
import { Validacion } from "./Validacion";

export class GestorDeCorreos {
  private _borradores = new Bandeja("Borradores");
  private _enviados = new Bandeja("Enviados");

  guardarBorrador(correo: Correo): void {
    this._borradores.agregar(correo);
  }

  enviar(correo: Correo): void {
    Validacion.validar(correo.asunto.trim() !== "", "Ingrese un asunto valido");
    this._borradores.quitar(correo);
    this._enviados.agregar(correo);
  }

  verBorradores(): Correo[] {
    return this._borradores.verCorreos();
  }

  verEnviados(): Correo[] {
    return this._enviados.verCorreos();
  }
}
