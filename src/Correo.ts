import { Contacto } from "./Contacto";

export class Correo {
  private static _siguienteId = 1;

  readonly remitente: Contacto | undefined;
  readonly asunto: string;
  readonly cuerpo: string;
  private _id: number;
  private _destinatarios: Contacto[] = [];
  private _leido = false;
  private _favorito = false;

  constructor(remitente: Contacto | undefined, asunto: string, cuerpo: string) {
    this._id = Correo._siguienteId++;
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

  get id(): number {
    return this._id;
  }
  
  get leido(): boolean {
    return this._leido;
  }

  get favorito(): boolean {
    return this._favorito;
  }

  marcarLeido(): void {
    this._leido = true;
  }

  marcarFavorito(): void {
    this._favorito = true;
  }

  copiar(): Correo {
    const copia = new Correo(this.remitente, this.asunto, this.cuerpo);
    copia._id = this._id;
    copia._destinatarios = [...this._destinatarios];
    return copia;
  }
}


