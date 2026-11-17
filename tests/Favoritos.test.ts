import { describe, it, expect } from "vitest";
import { Contacto } from "../src/Contacto";
import { Correo } from "../src/Correo";
import { verFavoritos } from "../src/Favoritos";
import { correosDeLaUcp } from "../src/FiltrosPredefinidos";
import { GestorDeCorreos } from "../src/GestorDeCorreos";

describe("Favoritos", () => {
  it("Reune favoritos de Entrada, Borradores y Enviados sin moverlos", () => {
    const gestor = new GestorDeCorreos();
    const remitente = new Contacto("Fabricio", "fabricio@ucp.edu.ar");
    const belen = new Contacto("Belén", "belen@ucp.edu.ar");

    const recibido = new Correo(belen, "Parcial", "Es el viernes");
    const sinMarcar = new Correo(belen, "Apuntes", "Estos son los temas");
    const borrador = gestor.editor.redactar(remitente);
    const enviado = gestor.editor.redactar(remitente, "Consulta", "Estudiamos?", [belen]);
    gestor.recibirCorreo(recibido);
    gestor.recibirCorreo(sinMarcar);
    gestor.enviar(enviado);

    recibido.marcarFavorito();
    borrador.marcarFavorito();
    enviado.marcarFavorito();

    const favoritos = verFavoritos(gestor);

    expect(favoritos).toEqual([recibido, borrador, enviado]);
    expect(gestor.verEntrada()).toEqual([recibido, sinMarcar]);
    expect(gestor.verBorradores()).toEqual([borrador]);
    expect(gestor.verEnviados()).toEqual([enviado]);
  });

  it("Refleja el desmarcado y oculta los eliminados hasta restaurarlos conservando la marca", () => {
    const gestor = new GestorDeCorreos();
    const belen = new Contacto("Belén", "belen@ucp.edu.ar");
    const recibido = new Correo(belen, "Parcial", "Es el viernes");
    gestor.recibirCorreo(recibido);

    recibido.marcarFavorito();
    expect(verFavoritos(gestor)).toEqual([recibido]);
    recibido.desmarcarFavorito();
    expect(verFavoritos(gestor)).toEqual([]);

    recibido.marcarFavorito();
    gestor.eliminar(recibido);

    expect(verFavoritos(gestor)).toEqual([]);
    expect(recibido.favorito).toBe(true);
    expect(gestor.verEliminados()).toEqual([recibido]);

    gestor.restaurar(recibido);

    expect(verFavoritos(gestor)).toEqual([recibido]);
    expect(gestor.verEntrada()).toEqual([recibido]);
    expect(gestor.verEliminados()).toEqual([]);
  });

  it("Permite aplicar un filtro existente sobre la vista de favoritos", () => {
    const gestor = new GestorDeCorreos();
    const belen = new Contacto("Belén", "belen@ucp.edu.ar");
    const ian = new Contacto("Ian", "ian@gmail.com");
    const favoritoUcp = new Correo(belen, "Parcial", "Es el viernes");
    const favoritoPersonal = new Correo(ian, "Partido", "Jugamos?");
    const sinMarcar = new Correo(belen, "Apuntes", "Estos son los temas");
    gestor.recibirCorreo(favoritoUcp);
    gestor.recibirCorreo(favoritoPersonal);
    gestor.recibirCorreo(sinMarcar);
    favoritoUcp.marcarFavorito();
    favoritoPersonal.marcarFavorito();
    const filtro = correosDeLaUcp();

    const resultado = filtro.aplicar(verFavoritos(gestor));

    expect(resultado).toEqual([favoritoUcp]);
    expect(verFavoritos(gestor)).toEqual([favoritoUcp, favoritoPersonal]);
    expect(gestor.verEntrada()).toEqual([favoritoUcp, favoritoPersonal, sinMarcar]);
  });
});
