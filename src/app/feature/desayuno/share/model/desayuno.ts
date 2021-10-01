import { DetalleDesayuno } from './detalle-desayuno';

export interface Desayuno {
    id: number;
    nombre: string;
    descripcion?: string;
    imagen: string;
    precio: number;
    detalle?: Array<DetalleDesayuno>;
}
