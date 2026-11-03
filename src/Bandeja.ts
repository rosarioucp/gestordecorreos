import { Correo } from "./Correo";

export class Bandeja {
  readonly nombre: string;
  private _correos: Correo[] = [];

  constructor(nombre: string) {
    this.nombre = nombre;
  }

  agregar(correo: Correo): void {
    this._correos.push(correo);
  }

  verCorreos(): Correo[] {
    return [...this._correos];
  }
}
