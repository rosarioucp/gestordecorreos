import { Correo } from "./Correo";
import type { IBandeja } from "./IBandeja";

export class Bandeja implements IBandeja {
  readonly nombre: string;
  private _correos: Correo[] = [];

  constructor(nombre: string) {
    this.nombre = nombre;
  }

  agregar(correo: Correo): void {
    !this.contiene(correo) && this._correos.push(correo);
  }

  contiene(correo: Correo): boolean {
    return this._correos.some(guardado => guardado === correo);
  }

  quitar(correo: Correo): void {
    this._correos = this._correos.filter(guardado => guardado !== correo);
  }

  verCorreos(): Correo[] {
    return [...this._correos];
  }
}
