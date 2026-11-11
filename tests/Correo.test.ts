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
    expect(correo.id).toBeDefined();
    expect(correo.leido).toBe(false);
    expect(correo.favorito).toBe(false);
  });

  it("Dos correos tienen identificadores distintos aunque tengan el mismo contenido", () => {
    const remitente = new Contacto("Fabricio", "fabricio@ucp.edu.ar");
    const primero = new Correo(remitente, "Consulta", "Que entra en la prueba?");
    const segundo = new Correo(remitente, "Consulta", "Que entra en la prueba?");

    expect(primero.id).not.toBe(segundo.id);
  });

  it("Permite crear correos con diferentes remitentes y destinatarios", () => {
    const fabricio = new Contacto("Fabricio", "fabricio@ucp.edu.ar");
    const belen = new Contacto("Belén", "belen@ucp.edu.ar");
    const ian = new Contacto("Ian", "ian@ucp.edu.ar");

    const correoFabricio = new Correo(fabricio, "Consulta", "Pinta juntarnos a estudiar?");
    correoFabricio.agregarDestinatario(belen);
    correoFabricio.agregarDestinatario(ian);

    const correoIan = new Correo(ian, "Respuesta", "Banco");
    correoIan.agregarDestinatario(fabricio);

    expect(correoFabricio.remitente).toBe(fabricio);
    expect(correoFabricio.verDestinatarios()).toEqual([belen, ian]);
    expect(correoIan.remitente).toBe(ian);
    expect(correoIan.verDestinatarios()).toEqual([fabricio]);
  });

  it("No agrega destinatarios con la misma direccion", () => {
    const remitente = new Contacto("Fabricio", "fabricio@ucp.edu.ar");
    const belen = new Contacto("Belén", "belen@ucp.edu.ar");
    const mismaDireccion = new Contacto("Otro nombre", " BELEN@ucp.edu.ar ");
    const correo = new Correo(remitente, "Consulta", "Que entra en la prueba?");

    correo.agregarDestinatario(belen);
    correo.agregarDestinatario(mismaDireccion);

    expect(correo.verDestinatarios()).toEqual([belen]);
  });

  it("Modificar la lista consultada no cambia los destinatarios del correo", () => {
    const remitente = new Contacto("Fabricio", "fabricio@ucp.edu.ar");
    const belen = new Contacto("Belén", "belen@ucp.edu.ar");
    const ian = new Contacto("Ian", "ian@ucp.edu.ar");
    const correo = new Correo(remitente, "Consulta", "Que entra en la prueba?");
    correo.agregarDestinatario(belen);

    const destinatarios = correo.verDestinatarios();
    destinatarios.pop();
    destinatarios.push(ian);

    expect(correo.verDestinatarios()).toEqual([belen]);
  });

  it("se puede marcar como leido", () => {
    const sofia = new Contacto("Sofia", "sofia@ucp.edu.ar");
    const correo = new Correo(sofia, "Saludo", "Hola,como estas");
    correo.marcarComoLeido();
    expect(correo.leido).toBe(true);
  });

   it("se puede marcar como favorito", () => {
    const sofia = new Contacto("Sofia", "sofia@ucp.edu.ar");
    const correo = new Correo(sofia, "Saludo", "Hola,como estas");
    correo.marcarComoFavorito();
    expect(correo.favorito).toBe(true);
  });


});
