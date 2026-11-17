import { describe, it, expect } from "vitest";
import { Contacto } from "../src/Contacto";

describe("Contacto", () => {
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
        const contacto1 = () => new Contacto("Sofia", " Sofia.gmail.com ");
        const contacto2 = () => new Contacto("Sofia", " Sofia@gmailcom ");
        expect(contacto1).toThrow();
        expect(contacto2).toThrow();
    });

    //contacto con nombre vacio//
    it("rechazar un contacto con nombre vacio", () => {
        const contacto1= () => new Contacto("", "sofia@gmail.com");
        const contacto2 = () => new Contacto("  ", "sofia@gmail.com");
        expect(contacto1).toThrow();
        expect(contacto2).toThrow();
    });

    //creacion de 2 contactos con las mismas direcciones //
    it("Compara dos contactos con la misma direccion", () => {
        const contacto1 = new Contacto("Sofia", "sofia@gmail.com");
        const contacto2 = new Contacto("Laura", "Sofia@gmail.com");
        expect(contacto1.mismoContacto(contacto2)).toBe(true);
    });

    //crea 2 contactos con el mismo nombre, distinta direccion//
    it("Compara dos contactos con el mismo nombre", () => {
        const contacto1 = new Contacto("Sofia", "sofia@gmail.com");
        const contacto2 = new Contacto("Sofia", "gomez@gmail.com");
        expect(contacto1.mismoContacto(contacto2)).toBe(false);
    });
});