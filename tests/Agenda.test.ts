import {describe, it, expect } from "vitest";
import {Contacto} from "../src/Contacto";
import {Agenda} from "../src/Agenda";

describe("Agenda", () =>{ 
    //creacion de agenda, agrega contacto//
    it("la agenda agrega un contacto y lo encuentra por su direccion", () => {
    const agenda = new Agenda ();
    agenda.agregarContacto(new Contacto("Sofia", "sofia@gmail.com"));
    expect(agenda.buscarContacto("sofia@gmail.com")?.nombre).toBe("Sofia");
    
    });

    it("Encuentra un contacto entre varios", () => {
    const agenda = new Agenda();
    agenda.agregarContacto(new Contacto("Sofia", "sofia@gmail.com"));
    agenda.agregarContacto(new Contacto("Laura", "laura@gmail.com"));
    agenda.agregarContacto(new Contacto("Juan", "juan@gmail.com"));
    expect(agenda.buscarContacto("laura@gmail.com")?.nombre).toBe("Laura");
    });

    it("Devuelve undefined si no encuentra el contacto", () => {
    const agenda = new Agenda();
    agenda.agregarContacto(new Contacto("Sofia", "sofia@gmail.com"));
    agenda.agregarContacto(new Contacto("Laura", "laura@gmail.com"));
    agenda.agregarContacto(new Contacto("Juan", "juan@gmail.com"));
    expect(agenda.buscarContacto("pedro@gmail.com")).toBeUndefined();
    });

    it("rechaza un contacto con una direccion que ya existe", () => {
    const agenda = new Agenda();
    agenda.agregarContacto(new Contacto("Sofia", "sofia@gmail.com"));
    expect(() => agenda.agregarContacto(new Contacto("Laura", "sofia@gmail.com"))).toThrow();
    });

    it("devuelve una copia de la lista de contactos", () => {
    const agenda = new Agenda();
    agenda.agregarContacto(new Contacto("Sofia", "sofia@gmail.com"));
    agenda.listarContactos().push(new Contacto("Laura", "laura@gmail.com"));
    expect(agenda.listarContactos()).toHaveLength(1);
    });

    it("elimina un contacto por su direccion", () => {
    const agenda = new Agenda();
    agenda.agregarContacto(new Contacto("Sofia", "sofia@gmail.com"));
    expect(agenda.eliminarContacto("sofia@gmail.com")).toBe(true);
    expect(agenda.buscarContacto("sofia@gmail.com")).toBeUndefined();
    });

    it("modifica el nombre y la direccion de un contacto", () => {
    const agenda = new Agenda();
    agenda.agregarContacto(new Contacto("Sofia", "sofia@gmail.com"));

    agenda.modificarContacto("sofia@gmail.com", "Sofia Perez", "sofiaperez@gmail.com");

    expect(agenda.buscarContacto("sofia@gmail.com")).toBeUndefined();
    expect(agenda.buscarContacto("sofiaperez@gmail.com")?.nombre).toBe("Sofia Perez");
});
});