import {describe, it, expect } from "vitest";
import {Contacto} from "../src/Contacto";

describe("Contacto", () =>{ 
    it("se crea con nombre y email", () => {
    const contacto = new Contacto("Sofia", "sofia@gmail.com");
    expect(contacto.nombre).toBe("Sofia");
    expect(contacto.email).toBe("sofia@gmail.com");
    });
});