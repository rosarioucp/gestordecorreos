import { describe, it, expect } from "vitest";
import { Contacto } from "../src/Contacto";
import { Correo } from "../src/Correo";
import { ServidorDeCorreo } from "../src/ServidorDeCorreo";

describe("ServidorDeCorreo", () => {
  it("Redacta un borrador, lo envia a varios destinatarios y elimina solo una copia", () => {
    const servidor = new ServidorDeCorreo();
    const fabricio = new Contacto("Fabricio", "fabricio@ucp.edu.ar");
    const belen = new Contacto("Belén", "belen@ucp.edu.ar");
    const ian = new Contacto("Ian", "ian@ucp.edu.ar");

    const gestorFabricio = servidor.registrar(fabricio);
    const gestorBelen = servidor.registrar(belen);
    const gestorIan = servidor.registrar(ian);

    const borrador = gestorFabricio.editor.redactar(fabricio);
    expect(gestorFabricio.verBorradores()).toEqual([borrador]);

    gestorFabricio.editor.cambiarAsunto(borrador.id, "Parcial");
    gestorFabricio.editor.cambiarCuerpo(borrador.id, "Es el viernes");
    gestorFabricio.editor.agregarDestinatario(borrador.id, belen);
    gestorFabricio.editor.agregarDestinatario(borrador.id, ian);

    servidor.enviar(borrador);

    const recibidoBelen = gestorBelen.verEntrada()[0]!;
    const recibidoIan = gestorIan.verEntrada()[0]!;

    expect(gestorFabricio.verBorradores()).toEqual([]);
    expect(gestorFabricio.verEnviados()).toEqual([borrador]);
    expect(recibidoBelen.id).toBe(borrador.id);
    expect(recibidoIan.id).toBe(borrador.id);

    gestorBelen.eliminar(recibidoBelen);

    expect(gestorBelen.verEntrada()).toEqual([]);
    expect(gestorBelen.verEliminados()).toEqual([recibidoBelen]);
    expect(gestorIan.verEntrada()).toEqual([recibidoIan]);
    expect(gestorFabricio.verEnviados()).toEqual([borrador]);
  });

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

  it("Al enviarse a uno mismo, elimina el original sin quitar la copia de Entrada", () => {
    const servidor = new ServidorDeCorreo();
    const remitente = new Contacto("Fabricio", "fabricio@ucp.edu.ar");
    const gestor = servidor.registrar(remitente);
    const correo = new Correo(remitente, "Recordatorio", "Estudiar para el coloquio");
    correo.agregarDestinatario(remitente);
    servidor.enviar(correo);

    const copia = gestor.verEntrada()[0]!;
    expect(copia.id).toBe(correo.id);
    expect(copia).not.toBe(correo);
    expect(() => servidor.enviar(copia)).toThrow("El correo ya fue enviado");

    gestor.eliminar(correo);

    expect(gestor.verEnviados()).toEqual([]);
    expect(gestor.verEntrada()[0]).toBe(copia);
    expect(gestor.verEliminados()[0]).toBe(correo);
    expect(() => servidor.enviar(copia)).toThrow("El correo esta en Eliminados");
  });

  it("Elimina y restaura las dos copias del envio a uno mismo en sus bandejas de origen", () => {
    const servidor = new ServidorDeCorreo();
    const remitente = new Contacto("Fabricio", "fabricio@ucp.edu.ar");
    const gestor = servidor.registrar(remitente);
    const correo = new Correo(remitente, "Recordatorio", "Estudiar para el coloquio");
    correo.agregarDestinatario(remitente);
    servidor.enviar(correo);

    const copia = gestor.verEntrada()[0]!;
    copia.marcarLeido();
    correo.marcarFavorito();

    gestor.eliminar(copia);
    gestor.eliminar(correo);

    expect(gestor.verEntrada()).toEqual([]);
    expect(gestor.verEnviados()).toEqual([]);
    expect(gestor.verEliminados()[0]).toBe(copia);
    expect(gestor.verEliminados()[1]).toBe(correo);

    gestor.restaurar(correo);
    expect(gestor.verEnviados()[0]).toBe(correo);
    expect(gestor.verEliminados()[0]).toBe(copia);

    gestor.restaurar(copia);
    expect(gestor.verEntrada()[0]).toBe(copia);
    expect(gestor.verEliminados()).toEqual([]);
    expect(copia.leido).toBe(true);
    expect(correo.leido).toBe(false);
    expect(correo.favorito).toBe(true);
    expect(copia.favorito).toBe(false);
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
