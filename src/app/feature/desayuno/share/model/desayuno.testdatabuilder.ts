import { Desayuno } from './desayuno';
import { DetalleDesayuno } from './detalle-desayuno';

export class DesayunoDataTestBuilder {
    id: number;
    nombre: string;
    descripcion?: string;
    imagen: string;
    precio: number;
    detalle?: Array<DetalleDesayuno>;

    constructor() {
        this.id = 1;
        this.nombre = 'Desayuno';
        this.descripcion = 'Descripcion';
        this.imagen = 'Imagen';
        this.precio = 0;
        this.detalle = [{ nombre: 'Detalle', cantidad: 1, unidad: 'und' }];
    }

    build(): Desayuno {
        return {
            id: this.id,
            nombre: this.nombre,
            descripcion: this.descripcion,
            imagen: this.imagen,
            precio: this.precio,
            detalle: this.detalle
        };
    }
}
