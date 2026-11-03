import { Bandeja } from "./Bandeja";
import { Correo } from "./Correo";

export class GestorDeCorreos {
  private _borradores = new Bandeja("Borradores");
  private _enviados = new Bandeja("Enviados");

  guardarBorrador(correo: Correo): void {
    this._borradores.agregar(correo);
  }

  verBorradores(): Correo[] {
    return this._borradores.verCorreos();
  }

  verEnviados(): Correo[] {
    return this._enviados.verCorreos();
  }
}
