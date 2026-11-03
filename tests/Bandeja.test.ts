import { describe, it, expect } from "vitest";
import { Bandeja } from "../src/Bandeja";
import { Contacto } from "../src/Contacto";
import { Correo } from "../src/Correo";

describe("Bandeja", () => {
  it("Guarda un correo y permite consultarlo", () => {
    const bandeja = new Bandeja("Borradores");
    const remitente = new Contacto("Fabricio", "fabricio@ucp.edu.ar");
    const correo = new Correo(remitente, "Consulta", "Que entra en la prueba?");

    bandeja.agregar(correo);

    expect(bandeja.verCorreos()).toEqual([correo]);
  });
});