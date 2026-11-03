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

  it("Envia un borrador a varios destinatarios y lo mueve a Enviados", () => {
    const gestor = new GestorDeCorreos();
    const remitente = new Contacto("Fabricio", "fabricio@ucp.edu.ar");
    const belen = new Contacto("Belén", "belen@ucp.edu.ar");
    const ian = new Contacto("Ian", "ian@ucp.edu.ar");
    const correo = new Correo(remitente, "Consulta", "Pinta juntarnos a estudiar?");
    correo.agregarDestinatario(belen);
    correo.agregarDestinatario(ian);
    gestor.guardarBorrador(correo);

    gestor.enviar(correo);

    expect(gestor.verBorradores()).toEqual([]);
    expect(gestor.verEnviados()).toEqual([correo]);
    expect(correo.verDestinatarios()).toEqual([belen, ian]);
  });
});
