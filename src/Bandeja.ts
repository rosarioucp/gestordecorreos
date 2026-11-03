import { Correo } from "./Correo";

export class Bandeja {
  readonly nombre: string;
  private _correos: Correo[] = [];

  constructor(nombre: string) {
    this.nombre = nombre;
  }

  agregar(correo: Correo): void {
    const existe = this._correos.some(guardado => guardado.id === correo.id);
    !existe && this._correos.push(correo);
  }

  verCorreos(): Correo[] {
    return [...this._correos];
  }
}
