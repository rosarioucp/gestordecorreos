import {describe, it, expect } from "vitest";
import { Validacion } from "../src/Validacion";

describe("Validacion", () =>{ 
    //test con mail correcto//
    it ("No da error si la condicion es verdadera",() =>{
        expect (()=> Validacion.validar(true, "El email no es valido")).not.toThrow();
    });

    //test que da error en el mail//
    it ("Da un error si la condicion es falsa",() =>{
        expect (()=> Validacion.validar(false, "El email no es valido")).toThrow();
    });
    //test que dice un mensaje del error que ocurrio//
    it ("Da un mensaje del error",() =>{
        expect (()=> Validacion.validar(false, "El nombre es obligatorio")).toThrow("El nombre es obligatorio");
    });
     
});

