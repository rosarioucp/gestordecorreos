import {describe, it, expect } from "vitest";
import { Validacion } from "../src/Validacion";

describe("Validacion", () =>{ 
    it ("Valida si la condicion es verdadera",() =>{
        expect (()=> Validacion.validar(true, "El email no es valido")).not.toThrow();
    });
    
});

