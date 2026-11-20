export class Validacion {
    public static validar (condicion:boolean, mensaje:string):void{
        condicion || Validacion.generarError(mensaje);

    }
    
    private static generarError (mensaje:string):never{
         throw new Error(mensaje);
    }
}

