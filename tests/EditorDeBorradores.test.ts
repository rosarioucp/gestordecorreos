import { describe, it, expect } from "vitest";
import { Contacto } from "../src/Contacto";
import { Correo } from "../src/Correo";
import { GestorDeCorreos } from "../src/GestorDeCorreos";
import { ServidorDeCorreo } from "../src/ServidorDeCorreo";

describe("EditorDeBorradores", () => {
  it("Registra un borrador aunque este incompleto", () => {
    const gestor = new GestorDeCorreos();
    const remitente = new Contacto("Fabricio", "fabricio@ucp.edu.ar");

    const borrador = gestor.editor.redactar(remitente);

    expect(gestor.verBorradores()).toEqual([borrador]);
    expect(borrador.remitente).toBe(remitente);
    expect(borrador.asunto).toBe("");
    expect(borrador.cuerpo).toBe("");
    expect(borrador.verDestinatarios()).toEqual([]);
  });

  it("Permite redactar con asunto, cuerpo y destinatarios completos", () => {
    const gestor = new GestorDeCorreos();
    const remitente = new Contacto("Fabricio", "fabricio@ucp.edu.ar");
    const belen = new Contacto("Belén", "belen@ucp.edu.ar");
    const ian = new Contacto("Ian", "ian@ucp.edu.ar");

    const borrador = gestor.editor.redactar(
      remitente, "Consulta", "Pinta juntarnos a estudiar?", [belen, ian]
    );

    expect(gestor.verBorradores()).toEqual([borrador]);
    expect(borrador.asunto).toBe("Consulta");
    expect(borrador.cuerpo).toBe("Pinta juntarnos a estudiar?");
    expect(borrador.verDestinatarios()).toEqual([belen, ian]);
  });

  it("Recupera y edita por id el borrador correcto conservando sus cambios", () => {
    const gestor = new GestorDeCorreos();
    const remitente = new Contacto("Fabricio", "fabricio@ucp.edu.ar");
    const belen = new Contacto("Belén", "belen@ucp.edu.ar");
    const ian = new Contacto("Ian", "ian@ucp.edu.ar");
    const primero = gestor.editor.redactar(remitente);
    const segundo = gestor.editor.redactar(remitente);

    const recuperado = gestor.editor.recuperar(segundo.id)!;
    gestor.editor.cambiarAsunto(recuperado.id, "Consulta");
    gestor.editor.cambiarCuerpo(recuperado.id, "Pinta juntarnos a estudiar?");
    gestor.editor.agregarDestinatario(recuperado.id, belen);
    gestor.editor.agregarDestinatario(recuperado.id, ian);
    gestor.editor.quitarDestinatario(recuperado.id, belen);

    expect(recuperado).toBe(segundo);
    expect(segundo.asunto).toBe("Consulta");
    expect(segundo.cuerpo).toBe("Pinta juntarnos a estudiar?");
    expect(segundo.verDestinatarios()).toEqual([ian]);
    expect(primero.asunto).toBe("");
    expect(primero.cuerpo).toBe("");
    expect(primero.verDestinatarios()).toEqual([]);
    expect(gestor.verBorradores()).toEqual([primero, segundo]);
  });

  it("Rechaza editar enviados, recibidos, eliminados y borradores de otro gestor", () => {
    const gestor = new GestorDeCorreos();
    const otroGestor = new GestorDeCorreos();
    const fabricio = new Contacto("Fabricio", "fabricio@ucp.edu.ar");
    const belen = new Contacto("Belén", "belen@ucp.edu.ar");

    const enviado = gestor.editor.redactar(fabricio, "Consulta", "Texto", [belen]);
    gestor.enviar(enviado);

    const recibido = new Correo(belen, "Respuesta", "Texto recibido");
    gestor.recibirCorreo(recibido);

    const eliminado = gestor.editor.redactar(fabricio, "", "", [belen]);
    gestor.eliminar(eliminado);

    const ajeno = otroGestor.editor.redactar(belen);

    expect(() => gestor.editor.cambiarAsunto(enviado.id, "Otro"))
      .toThrow("Solo se pueden editar borradores");
    expect(() => gestor.editor.cambiarCuerpo(recibido.id, "Otro"))
      .toThrow("Solo se pueden editar borradores");
    expect(() => gestor.editor.agregarDestinatario(ajeno.id, fabricio))
      .toThrow("Solo se pueden editar borradores");
    expect(() => gestor.editor.quitarDestinatario(eliminado.id, belen))
      .toThrow("Solo se pueden editar borradores");
    expect(gestor.editor.recuperar(ajeno.id)).toBeUndefined();
  });

  it("Conserva el borrador invalido y permite completarlo y enviarlo por el servidor", () => {
    const servidor = new ServidorDeCorreo();
    const fabricio = new Contacto("Fabricio", "fabricio@ucp.edu.ar");
    const belen = new Contacto("Belén", "belen@ucp.edu.ar");
    const gestorFabricio = servidor.registrar(fabricio);
    const gestorBelen = servidor.registrar(belen);
    const borrador = gestorFabricio.editor.redactar(fabricio);
    gestorFabricio.editor.cambiarAsunto(borrador.id, "Consulta");

    expect(() => servidor.enviar(borrador))
      .toThrow("Ingrese al menos un destinatario");
    expect(gestorFabricio.verBorradores()).toEqual([borrador]);
    expect(gestorFabricio.verEnviados()).toEqual([]);
    expect(gestorBelen.verEntrada()).toEqual([]);

    gestorFabricio.editor.cambiarCuerpo(borrador.id, "Pinta juntarnos a estudiar?");
    gestorFabricio.editor.agregarDestinatario(borrador.id, belen);
    servidor.enviar(borrador);

    const recibidoBelen = gestorBelen.verEntrada()[0]!;
    expect(gestorFabricio.verBorradores()).toEqual([]);
    expect(gestorFabricio.verEnviados()).toEqual([borrador]);
    expect(recibidoBelen.id).toBe(borrador.id);
    expect(recibidoBelen.asunto).toBe("Consulta");
    expect(recibidoBelen.cuerpo).toBe("Pinta juntarnos a estudiar?");
    expect(recibidoBelen.verDestinatarios()).toEqual([belen]);
  });
});
