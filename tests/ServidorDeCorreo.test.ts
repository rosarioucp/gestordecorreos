import { describe, it, expect } from "vitest";
import { Contacto } from "../src/Contacto";
import { Correo } from "../src/Correo";
import { ServidorDeCorreo } from "../src/ServidorDeCorreo";

describe("ServidorDeCorreo", () => {
  it("Envia un correo y queda en Enviados del remitente y en Entrada de cada destinatario", () => {
    const servidor = new ServidorDeCorreo();
    const remitente = new Contacto("Fabricio", "fabricio@ucp.edu.ar");
    const belen = new Contacto("Belén", "belen@ucp.edu.ar");
    const ian = new Contacto("Ian", "ian@ucp.edu.ar");

    const gestorFabricio = servidor.registrar(remitente);
    const gestorBelen = servidor.registrar(belen);
    const gestorIan = servidor.registrar(ian);

    const correo = new Correo(remitente, "Parcial", "Es el viernes");
    correo.agregarDestinatario(belen);
    correo.agregarDestinatario(ian);

    servidor.enviar(correo);

    const recibidoBelen = gestorBelen.verEntrada()[0]!;
    const recibidoIan = gestorIan.verEntrada()[0]!;

    expect(gestorFabricio.verEnviados()).toEqual([correo]);
    expect(recibidoBelen.id).toBe(correo.id);
    expect(recibidoBelen.asunto).toBe(correo.asunto);
    expect(recibidoBelen.cuerpo).toBe(correo.cuerpo);
    expect(recibidoIan.id).toBe(correo.id);
    expect(recibidoIan.asunto).toBe(correo.asunto);
    expect(recibidoIan.cuerpo).toBe(correo.cuerpo);
  });

  it("Eliminar la copia de Belen conserva los correos de los otros usuarios", () => {
    const servidor = new ServidorDeCorreo();
    const remitente = new Contacto("Fabricio", "fabricio@ucp.edu.ar");
    const belen = new Contacto("Belén", "belen@ucp.edu.ar");
    const ian = new Contacto("Ian", "ian@ucp.edu.ar");

    const gestorFabricio = servidor.registrar(remitente);
    const gestorBelen = servidor.registrar(belen);
    const gestorIan = servidor.registrar(ian);

    const correo = new Correo(remitente, "Parcial", "Es el viernes");
    correo.agregarDestinatario(belen);
    correo.agregarDestinatario(ian);
    servidor.enviar(correo);

    const recibidoBelen = gestorBelen.verEntrada()[0]!;
    const recibidoIan = gestorIan.verEntrada()[0]!;

    gestorBelen.eliminar(recibidoBelen);

    expect(gestorBelen.verEntrada()).toEqual([]);
    expect(gestorBelen.verEliminados()).toEqual([recibidoBelen]);
    expect(gestorIan.verEntrada()).toEqual([recibidoIan]);
    expect(gestorFabricio.verEnviados()).toEqual([correo]);
  });

  it("Leer la copia de Belen conserva el estado de los otros usuarios", () => {
    const servidor = new ServidorDeCorreo();
    const remitente = new Contacto("Fabricio", "fabricio@ucp.edu.ar");
    const belen = new Contacto("Belén", "belen@ucp.edu.ar");
    const ian = new Contacto("Ian", "ian@ucp.edu.ar");

    const gestorFabricio = servidor.registrar(remitente);
    const gestorBelen = servidor.registrar(belen);
    const gestorIan = servidor.registrar(ian);

    const correo = new Correo(remitente, "Parcial", "Es el viernes");
    correo.agregarDestinatario(belen);
    correo.agregarDestinatario(ian);
    servidor.enviar(correo);

    const recibidoBelen = gestorBelen.verEntrada()[0]!;
    const recibidoIan = gestorIan.verEntrada()[0]!;
    const enviado = gestorFabricio.verEnviados()[0]!;

    recibidoBelen.marcarLeido();

    expect(recibidoBelen.leido).toBe(true);
    expect(recibidoIan.leido).toBe(false);
    expect(enviado.leido).toBe(false);
  });

  it("Rechaza todo el envio si un destinatario no esta registrado", () => {
    const servidor = new ServidorDeCorreo();
    const remitente = new Contacto("Fabricio", "fabricio@ucp.edu.ar");
    const belen = new Contacto("Belén", "belen@ucp.edu.ar");
    const desconocido = new Contacto("Desconocido", "nadie@ucp.edu.ar");

    const gestorFabricio = servidor.registrar(remitente);
    const gestorBelen = servidor.registrar(belen);

    const correo = new Correo(remitente, "Parcial", "Es el viernes");
    correo.agregarDestinatario(belen);
    correo.agregarDestinatario(desconocido);

    expect(() => servidor.enviar(correo))
      .toThrow("El usuario no esta registrado");

    expect(gestorFabricio.verEnviados()).toEqual([]);
    expect(gestorBelen.verEntrada()).toEqual([]);
  });
});
