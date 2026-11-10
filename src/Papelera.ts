import type { Bandeja } from "./Bandeja";
import type { Correo } from "./Correo";
import type { IBandeja } from "./IBandeja";
import { Validacion } from "./Validacion";

export class Papelera implements IBandeja {
  private _eliminados: { correo: Correo; origen: Bandeja }[] = [];

  agregar(correo: Correo, origen: Bandeja): void {
    Validacion.validar(!this.contiene(correo), "El correo ya está eliminado");
    this._eliminados.push({ correo, origen });
  }

  contiene(correo: Correo): boolean {
    return this._eliminados.some(guardado => guardado.correo.id === correo.id);
  }

  verCorreos(): Correo[] {
    return this._eliminados.map(guardado => guardado.correo);
  }

  quitar(correo: Correo): void {
    this._eliminados = this._eliminados.filter(
      guardado => guardado.correo.id !== correo.id
    );
  }

  buscarOrigen(correo: Correo): Bandeja | undefined {
    const guardado = this._eliminados.find(
      eliminado => eliminado.correo.id === correo.id
    );

    return guardado?.origen;
  }
}
