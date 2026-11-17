import { describe, it, expect } from "vitest";
import { Contacto } from "../src/Contacto";
import { Correo } from "../src/Correo";
import { GestorDeCorreos } from "../src/GestorDeCorreos";

describe("GestorDeCorreos", () => {
  it("Recibe un correo y permite consultarlo en Entrada", () => {
    const gestor = new GestorDeCorreos();
    const belen = new Contacto("Belén", "belen@ucp.edu.ar");
    const fabricio = new Contacto("Fabricio", "fabricio@ucp.edu.ar");
    const correo = new Correo(belen, "Parcial del viernes", "Que entra en el parcial?");
    correo.agregarDestinatario(fabricio);

    gestor.recibirCorreo(correo);

    expect(gestor.verEntrada()).toEqual([correo]);
  });

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

  it("Rechaza un envio sin asunto y conserva el borrador", () => {
    const gestor = new GestorDeCorreos();
    const remitente = new Contacto("Fabricio", "fabricio@ucp.edu.ar");
    const destinatario = new Contacto("Belén", "belen@ucp.edu.ar");
    const correo = new Correo(remitente, "", "Que entra en la prueba?");
    correo.agregarDestinatario(destinatario);
    gestor.guardarBorrador(correo);

    expect(() => gestor.enviar(correo)).toThrow("Ingrese un asunto valido");
    expect(gestor.verBorradores()).toEqual([correo]);
    expect(gestor.verEnviados()).toEqual([]);
  });

  it("Rechaza un envio sin destinatarios y conserva el borrador", () => {
    const gestor = new GestorDeCorreos();
    const remitente = new Contacto("Fabricio", "fabricio@ucp.edu.ar");
    const correo = new Correo(remitente, "Consulta", "Que entra en la prueba?");
    gestor.guardarBorrador(correo);

    expect(() => gestor.enviar(correo)).toThrow("Ingrese al menos un destinatario");
    expect(gestor.verBorradores()).toEqual([correo]);
    expect(gestor.verEnviados()).toEqual([]);
  });

  it("Rechaza un envio sin remitente y conserva el borrador", () => {
    const gestor = new GestorDeCorreos();
    const destinatario = new Contacto("Belén", "belen@ucp.edu.ar");
    const correo = new Correo(undefined, "Consulta", "Que entra en la prueba?");
    correo.agregarDestinatario(destinatario);
    gestor.guardarBorrador(correo);

    expect(() => gestor.enviar(correo)).toThrow("Ingrese un remitente valido");
    expect(gestor.verBorradores()).toEqual([correo]);
    expect(gestor.verEnviados()).toEqual([]);
  });

  it("No permite reenviar ni guardar como borrador un correo enviado", () => {
    const gestor = new GestorDeCorreos();
    const remitente = new Contacto("Fabricio", "fabricio@ucp.edu.ar");
    const destinatario = new Contacto("Belén", "belen@ucp.edu.ar");
    const correo = new Correo(remitente, "Consulta", "Que entra en la prueba?");
    correo.agregarDestinatario(destinatario);
    gestor.enviar(correo);

    expect(() => gestor.enviar(correo)).toThrow("El correo ya fue enviado");
    expect(() => gestor.guardarBorrador(correo)).toThrow("El correo ya fue enviado");
    expect(gestor.verEnviados()).toEqual([correo]);
    expect(gestor.verBorradores()).toEqual([]);
  });

  it("Rechaza reenviar o guardar como borrador un correo que esta en Eliminados", () => {
    const gestor = new GestorDeCorreos();
    const remitente = new Contacto("Fabricio", "fabricio@ucp.edu.ar");
    const belen = new Contacto("Belén", "belen@ucp.edu.ar");
    const correo = new Correo(remitente, "Consulta", "Estudiamos?");
    correo.agregarDestinatario(belen);
    gestor.enviar(correo);
    gestor.eliminar(correo);

    expect(() => gestor.enviar(correo))
      .toThrow("El correo esta en Eliminados");
    expect(() => gestor.guardarBorrador(correo))
      .toThrow("El correo esta en Eliminados");

    expect(gestor.verEnviados()).toEqual([]);
    expect(gestor.verBorradores()).toEqual([]);
    expect(gestor.verEliminados()).toEqual([correo]);
  });

  it("Elimina un correo de Entrada y lo mueve a Eliminados", () => {
    const gestor = new GestorDeCorreos();
    const belen = new Contacto("Belén", "belen@ucp.edu.ar");
    const fabricio = new Contacto("Fabricio", "fabricio@ucp.edu.ar");
    const correo = new Correo(belen, "Parcial del viernes", "Que entra en el parcial?");
    correo.agregarDestinatario(fabricio);
    gestor.recibirCorreo(correo);

    gestor.eliminar(correo);

    expect(gestor.verEntrada()).toEqual([]);
    expect(gestor.verEliminados()).toEqual([correo]);
  });

  it("Restaura un correo eliminado a su bandeja de origen", () => {
    const gestor = new GestorDeCorreos();
    const belen = new Contacto("Belén", "belen@ucp.edu.ar");
    const fabricio = new Contacto("Fabricio", "fabricio@ucp.edu.ar");
    const correo = new Correo(belen, "Parcial del viernes", "Que entra en el parcial?");
    correo.agregarDestinatario(fabricio);
    gestor.recibirCorreo(correo);
    gestor.eliminar(correo);

    gestor.restaurar(correo);

    expect(gestor.verEntrada()).toEqual([correo]);
    expect(gestor.verEliminados()).toEqual([]);
  });

  it("No permite eliminar un correo que no esta en ninguna bandeja ni restaurar uno no eliminado", () => {
    const gestor = new GestorDeCorreos();
    const belen = new Contacto("Belén", "belen@ucp.edu.ar");
    const correo = new Correo(belen, "Parcial del viernes", "Que entra en el parcial?");

    expect(() => gestor.eliminar(correo)).toThrow("El correo no esta en ninguna bandeja");
    expect(() => gestor.restaurar(correo)).toThrow("El correo no esta en Eliminados");
  });
});
