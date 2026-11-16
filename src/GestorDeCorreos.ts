import { Bandeja } from "./Bandeja";
import { Correo } from "./Correo";
import { Papelera } from "./Papelera";
import { Validacion } from "./Validacion";
import { ValidadorEnvio } from "./ValidadorEnvio";

export class GestorDeCorreos {
  private _entrada = new Bandeja("Entrada");
  private _borradores = new Bandeja("Borradores");
  private _enviados = new Bandeja("Enviados");
  private _validadorEnvio = new ValidadorEnvio();
  private _papelera = new Papelera();

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

  eliminar(correo: Correo): void {
    const bandejas = [this._entrada, this._borradores, this._enviados];
    const origen = bandejas.find(bandeja => bandeja.contiene(correo));

    Validacion.validar(
      origen !== undefined,
      "El correo no esta en ninguna bandeja"
    );

    this._papelera.agregar(correo, origen!);
    origen!.quitar(correo);
  }

  restaurar(correo: Correo): void {
    const origen = this._papelera.buscarOrigen(correo);

    Validacion.validar(
      origen !== undefined,
      "El correo no esta en Eliminados"
    );

    origen!.agregar(correo);
    this._papelera.quitar(correo);
  }

  verEliminados(): Correo[] {
    return this._papelera.verCorreos();
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
