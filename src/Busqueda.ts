import {Correo} from "./Correo";

export function buscarCorreos(correos: Correo[], texto: string): Correo[] {
    const buscado = texto.toLowerCase();
    return correos.filter(correo =>
    correo.asunto.toLowerCase().includes(buscado) || 
    correo.cuerpo.toLowerCase().includes(buscado)||
    correo.remitente?.nombre.toLowerCase().includes(buscado)||
    correo.remitente?.direccion.toLowerCase().includes(buscado)
    );
}

}