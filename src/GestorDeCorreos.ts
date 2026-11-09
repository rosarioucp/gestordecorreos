import { Bandeja } from "./Bandeja";
import { Correo } from "./Correo";
import { ValidadorEnvio } from "./ValidadorEnvio";

export class GestorDeCorreos {
  private readonly _entrada = new Bandeja("Entrada");
  private _borradores = new Bandeja("Borradores");
  private _enviados = new Bandeja("Enviados");
  private readonly _validadorEnvio = new ValidadorEnvio();

  recibirCorreo(correo: Correo): void {
    this._entrada.agregar(correo);
  }

  guardarBorrador(correo: Correo): void {
    this._validadorEnvio.ValidarFueEnviado(this._enviados.contiene(correo));
    this._borradores.agregar(correo);
  }

  enviar(correo: Correo): void {
    this._validadorEnvio.ValidarFueEnviado(this._enviados.contiene(correo));
    this._validadorEnvio.validarDatosEnvio(correo);
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
