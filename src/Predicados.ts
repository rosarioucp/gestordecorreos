import type { IVerCorreo } from "./IVerCorreo";

export type Predicado = (correo: IVerCorreo) => boolean;

//predicados simples//
export function asuntoContiene(texto: string): Predicado {
    return (correo: IVerCorreo) => correo.asunto.toLowerCase().includes(texto.toLowerCase());
}

export function cuerpoContiene(texto: string): Predicado {
    return (correo: IVerCorreo) => correo.cuerpo.toLowerCase().includes(texto.toLowerCase());
}

export function enviadoPor(direccion: string): Predicado {
    return (correo: IVerCorreo) => correo.remitente?.direccion === direccion.trim().toLowerCase();
}

export function recibidoPor(direccion: string): Predicado {
    const buscada = direccion.trim().toLowerCase();
    return (correo: IVerCorreo) => correo.verDestinatarios().some(destinatario => destinatario.direccion === buscada);
}
export function enviadoDesde(dominio: string): Predicado {
    return (correo: IVerCorreo) => correo.remitente?.direccion.endsWith(dominio.toLowerCase()) ?? false;
}

export function esLeido(): Predicado {
    return (correo: IVerCorreo) => correo.leido;
}

export function esFavorito(): Predicado {
    return (correo: IVerCorreo) => correo.favorito;
}

//operadores and, or, not//

export function y(predicado1: Predicado, predicado2: Predicado): Predicado {
    return (correo: IVerCorreo) => predicado1(correo) && predicado2(correo);
}

export function o(predicado1: Predicado, predicado2: Predicado): Predicado {
    return (correo: IVerCorreo) => predicado1(correo) || predicado2(correo);
}

export function no(predicado: Predicado): Predicado {
    return (correo: IVerCorreo) => !predicado(correo);
}


