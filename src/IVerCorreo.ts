export interface IVerCorreo {
    readonly asunto: string;
    readonly cuerpo: string;
    readonly remitente: Contacto | undefined;
    readonly leido: boolean;
    readonly favorito: boolean;
    verDestinatarios(): Contacto[];
}