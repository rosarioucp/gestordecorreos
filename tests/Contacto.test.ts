import {describe, it, expect } from "vitest";
import {Contacto} from "../src/Contacto";

describe("Contacto", () =>{ 
    //creacion de contacto//
    it("se crea con nombre y direccion de correo", () => {
    const contacto = new Contacto("Sofia", "sofia@gmail.com");
    expect(contacto.nombre).toBe("Sofia");
    expect(contacto.direccion).toBe("sofia@gmail.com");
    });

    //normalizacion del contacto//
    it("normaliza el contacto", () => {
    const contacto = new Contacto("Sofia", " Sofia@gmail.com ");
    expect(contacto.direccion).toBe("sofia@gmail.com");
    });

    //contacto con direccion invalida//
      it("rechazar un contacto con direccion invalida", () => {
     expect (()=> new Contacto("Sofia", " Sofia.gmail.com ")).toThrow();
     expect (()=> new Contacto("Sofia", " Sofia@gmailcom ")).toThrow();
      });

    //contacto con nombre vacio//
      it("rechazar un contacto con nombre vacio", () => {
     expect (()=> new Contacto("", "sofia@gmail.com")).toThrow();
     expect (()=> new Contacto("  ", "sofia@gmail.com")).toThrow();
      });



});