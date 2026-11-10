import {Correo} from "./Correo";

export function asuntoContiene(texto: string) {
    return (correo: Correo) => correo.asunto.toLowerCase().includes(texto.toLowerCase());
}

export function cuerpoContiene(texto: string) {
    return (correo: Correo) => correo.cuerpo.toLowerCase().includes(texto.toLowerCase());
}

export function enviadoPor (direccion: string){
    return (correo: Correo) => correo.remitente?.direccion === direccion.trim().toLowerCase();
}

export function recibidoPor (direccion:string){
    const buscada = direccion.trim().toLowerCase();
    return (correo: Correo) => correo.verDestinatarios().some(destinatario => destinatario.direccion === buscada);
}