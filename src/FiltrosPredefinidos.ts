import {Filtro} from "./Filtro";
import {asuntoContiene, enviadoDesde, y, no, cuerpoContiene, esLeido, esFavorito, enviadoPor, o} from "./Predicados";

//filtro simple//
export function correosDeLaUcp(): Filtro {
    return new Filtro("Correos de la UCP", enviadoDesde("@ucp.edu.ar"));
}

export function noLeidos(): Filtro {
    return new Filtro("No leidos", no(esLeido()));
}

//filtros complejos//
//combina el dominio y el asunto//
export function academicosImportantes(): Filtro {
    return new Filtro("Correos academicos importantes", y(enviadoDesde("@ucp.edu.ar"), asuntoContiene("examen")));
}

//combina si no se leyo y el cuerpo del correo//
export function noLeidosEntrega (): Filtro {
    return new Filtro("Correos no leidos sobre entregas", y(no(esLeido()), cuerpoContiene("entrega")));
}

//combina si el correo es favorito y el remitente//
export function correosPrioritarios(direccion: string): Filtro {
    return new Filtro("Correos favoritos y de un determinado contacto", y(esFavorito(), enviadoPor(direccion)));
}

export function seguimientoEventos(): Filtro {
    return new Filtro("Correos para seguimiento de eventos", y(o(asuntoContiene("proyecto"), asuntoContiene("reunión")), no(esLeido())));
}