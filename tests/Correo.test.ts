import { describe, it, expect } from "vitest";
import { Contacto } from "../src/Contacto";
import { Correo } from "../src/Correo";

describe("Correo", () => {
  it("Se inicializa correctamente y conserva sus datos", () => {
    const remitente = new Contacto("Fabricio", "fabricio@ucp.edu.ar");
    const destinatario = new Contacto("Belén", "belen@ucp.edu.ar");
    const correo = new Correo(remitente, "Consulta", "Que entra en la prueba?");
    correo.agregarDestinatario(destinatario);

    expect(correo.remitente).toBe(remitente);
    expect(correo.asunto).toBe("Consulta");
    expect(correo.cuerpo).toBe("Que entra en la prueba?");
    expect(correo.verDestinatarios()).toEqual([destinatario]);
    expect(correo.leido).toBe(false);
    expect(correo.favorito).toBe(false);
  });
});
