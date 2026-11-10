import {Correo} from "./Correo";

export function buscarCorreos(correos: Correo[], texto: string): Correo[] {
    return correos.filter(correo => correo.asunto.toLowerCase().includes(texto.toLowerCase()));
}