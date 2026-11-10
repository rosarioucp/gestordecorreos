import type { Correo } from "./Correo";

export interface IBandeja {
  contiene(correo: Correo): boolean;
  verCorreos(): Correo[];
  quitar(correo: Correo): void;
}
