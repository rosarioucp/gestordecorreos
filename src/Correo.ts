import { Contacto } from "./Contacto";

export class Correo {
  private static _siguienteId = 1;

  readonly id: number;
  readonly remitente: Contacto | undefined;
  readonly asunto: string;
  readonly cuerpo: string;
  private _destinatarios: Contacto[] = [];
  private _leido = false;
  private _favorito = false;

  constructor(remitente: Contacto | undefined, asunto: string, cuerpo: string) {
    this.id = Correo._siguienteId++;
    this.remitente = remitente;
    this.asunto = asunto;
    this.cuerpo = cuerpo;
  }

  agregarDestinatario(contacto: Contacto): void {
    const existe = this._destinatarios.some(guardado => guardado.direccion === contacto.direccion);
    !existe && this._destinatarios.push(contacto);
  }

  verDestinatarios(): Contacto[] {
    return [...this._destinatarios];
  }

  get leido(): boolean {
    return this._leido;
  }

  get favorito(): boolean {
    return this._favorito;
  }

  marcarComoLeido(): void {
    this._leido = true;
  }

  marcarComoFavorito(): void {
    this._favorito = true;
  }
}


