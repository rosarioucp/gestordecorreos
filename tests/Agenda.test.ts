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



});