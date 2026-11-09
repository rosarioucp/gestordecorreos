import { Correo } from "./Correo";
import { Validacion } from "./Validacion";

export class ValidadorEnvio {
  ValidarFueEnviado(fueEnviado: boolean): void {
    Validacion.validar(!fueEnviado, "El correo ya fue enviado");
  }

  validarDatosEnvio(correo: Correo): void {
    Validacion.validar(correo.remitente !== undefined, "Ingrese un remitente valido");
    Validacion.validar(correo.asunto.trim() !== "", "Ingrese un asunto valido");
    Validacion.validar(correo.verDestinatarios().length > 0, "Ingrese al menos un destinatario");
  }
}
