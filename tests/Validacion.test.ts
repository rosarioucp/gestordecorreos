import {describe, it, expect } from "vitest";
import { Validacion } from "../src/Validacion";

describe("Validacion", () =>{ 
    it ("No da error si la condicion es verdadera",() =>{
        expect (()=> Validacion.validar(true, "El email no es valido")).not.toThrow();
    });
    
     it ("Da un error si la condicion es falsa",() =>{
        expect (()=> Validacion.validar(false, "El email no es valido")).toThrow();
    });
});

