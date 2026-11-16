import {Filtro} from "./Filtro";
import {asuntoContiene, enviadoDesde, y, no, cuerpoContiene, esLeido} from "./Predicados";

//filtro simple//
export function correosDeLaUcp(): Filtro {
    return new Filtro("Correos de la UCP", enviadoDesde("@ucp.edu.ar"));
}

//filtros complejos//
export function academicosImportantes(): Filtro {
    return new Filtro("Correos academicos importantes", y(enviadoDesde("@ucp.edu.ar"), asuntoContiene("examen")));
}

export function noLeidosEntrega (): Filtro {
    return new Filtro("Correos no leidos sobre entregas", y(no(esLeido()), cuerpoContiene("entrega")));
}

