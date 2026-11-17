import type { Correo } from "./Correo";
import type { GestorDeCorreos } from "./GestorDeCorreos";
import { esFavorito } from "./Predicados";

export function verFavoritos(gestor: GestorDeCorreos): Correo[] {
  const correos = [
    ...gestor.verEntrada(),
    ...gestor.verBorradores(),
    ...gestor.verEnviados()
  ];
  return correos.filter(esFavorito());
}
