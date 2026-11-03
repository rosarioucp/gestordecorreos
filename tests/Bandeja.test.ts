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

  it("No guarda dos veces el mismo correo", () => {
    const bandeja = new Bandeja("Borradores");
    const remitente = new Contacto("Fabricio", "fabricio@ucp.edu.ar");
    const correo = new Correo(remitente, "Consulta", "Que entra en la prueba?");

    bandeja.agregar(correo);
    bandeja.agregar(correo);

    expect(bandeja.verCorreos()).toEqual([correo]);
  });

  it("Permite comprobar si contiene un correo y retirarlo sin quitar los otros", () => {
    const bandeja = new Bandeja("Borradores");
    const remitente = new Contacto("Fabricio", "fabricio@ucp.edu.ar");
    const primero = new Correo(remitente, "Consulta", "Que entra en la prueba?");
    const segundo = new Correo(remitente, "Otra consulta", "Cuando es?");
    bandeja.agregar(primero);
    bandeja.agregar(segundo);

    expect(bandeja.contiene(primero)).toBe(true);

    bandeja.quitar(primero);

    expect(bandeja.contiene(primero)).toBe(false);
    expect(bandeja.contiene(segundo)).toBe(true);
    expect(bandeja.verCorreos()).toEqual([segundo]);
  });
});
