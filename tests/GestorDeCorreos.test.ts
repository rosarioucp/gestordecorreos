import { describe, it, expect } from "vitest";
import { Contacto } from "../src/Contacto";
import { Correo } from "../src/Correo";
import { GestorDeCorreos } from "../src/GestorDeCorreos";

describe("GestorDeCorreos", () => {
  it("Guarda un correo incompleto como borrador", () => {
    const gestor = new GestorDeCorreos();
    const remitente = new Contacto("Fabricio", "fabricio@ucp.edu.ar");
    const correo = new Correo(remitente, "", "");

    gestor.guardarBorrador(correo);

    expect(gestor.verBorradores()).toEqual([correo]);
    expect(gestor.verEnviados()).toEqual([]);
  });
});
