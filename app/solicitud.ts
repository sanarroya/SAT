import {camposolicitud} from "./camposSolicitud";
export class Solicitud {
    id: number
    nombre: string
    estado: string
    nombrefuncionario: string
    documentofuncionario: string
    nombreciudadano: string
    documentociudadano: string
    fechacreacion: string
    campos: camposolicitud[]
}