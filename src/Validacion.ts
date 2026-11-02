export class Validacion {
    public static validar (condicion:boolean, mensaje:string):void{
        condicion || Validacion.generarError(mensaje);

    }
//revisar este metodo si pongo never  o void//
    private static generarError (mensaje:string):never{
         throw new Error(mensaje);
    }
}

