import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http.service';
import { Desayuno } from '@desayuno/share/model/desayuno';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

export abstract class DesayunoService {
    abstract listar(): Observable<Array<Desayuno>>;
    abstract detalle(id: number): Observable<Desayuno>;
}

@Injectable()
export class DesayunoServiceImpl extends DesayunoService {

    constructor(private http: HttpService) {
        super();
    }

    listar(): Observable<Array<Desayuno>> {
        return this.http.doGet(`${environment.endpoint}/desayuno`);
    }

    detalle(id: number): Observable<Desayuno> {
        return this.http.doGet(`${environment.endpoint}/desayuno/${id}`);
    }

}


@Injectable()
export class DesayunoServiceStub extends DesayunoService {

    listar(): Observable<Array<Desayuno>> {
        return of([
            { id: 1, nombre: 'Ancheta de Amor', precio: 155000, imagen: 'https://www.regalosquehablan.com/media/img/productos/medium/desayuno-ancheta-de-mi-tierra.jpg' },
            { id: 1, nombre: 'Ancheta de Amor', precio: 155000, imagen: 'https://www.regalosquehablan.com/media/img/productos/medium/desayuno-ancheta-de-mi-tierra.jpg' },
            { id: 1, nombre: 'Ancheta de Amor', precio: 155000, imagen: 'https://www.regalosquehablan.com/media/img/productos/medium/desayuno-ancheta-de-mi-tierra.jpg' },
            { id: 1, nombre: 'Ancheta de Amor', precio: 155000, imagen: 'https://www.regalosquehablan.com/media/img/productos/medium/desayuno-ancheta-de-mi-tierra.jpg' },
            { id: 1, nombre: 'Ancheta de Amor', precio: 155000, imagen: 'https://www.regalosquehablan.com/media/img/productos/medium/desayuno-ancheta-de-mi-tierra.jpg' },
            { id: 1, nombre: 'Ancheta de Amor', precio: 155000, imagen: 'https://www.regalosquehablan.com/media/img/productos/medium/desayuno-ancheta-de-mi-tierra.jpg' },
            { id: 1, nombre: 'Ancheta de Amor', precio: 155000, imagen: 'https://www.regalosquehablan.com/media/img/productos/medium/desayuno-ancheta-de-mi-tierra.jpg' },
            { id: 1, nombre: 'Ancheta de Amor', precio: 155000, imagen: 'https://www.regalosquehablan.com/media/img/productos/medium/desayuno-ancheta-de-mi-tierra.jpg' },
            { id: 1, nombre: 'Ancheta de Amor', precio: 155000, imagen: 'https://www.regalosquehablan.com/media/img/productos/medium/desayuno-ancheta-de-mi-tierra.jpg' },
            { id: 1, nombre: 'Ancheta de Amor', precio: 155000, imagen: 'https://www.regalosquehablan.com/media/img/productos/medium/desayuno-ancheta-de-mi-tierra.jpg' }
        ]);
    }

    detalle(id: number): Observable<Desayuno> {
        return of({
            id,
            nombre: 'Ancheta de Amor',
            precio: 155000,
            imagen: 'https://www.regalosquehablan.com/media/img/productos/medium/desayuno-ancheta-de-mi-tierra.jpg',
            descripcion: 'La sorpresa es que le llegue a tu ser querido algo que no se espera y menos que seas es el primero en sorprenderle con uno de nuestros desayunos sorpresa',
            detalle: [
                { nombre: 'Bandeja de patas en madera', cantidad: 1, unidad: 'und' },
                { nombre: 'Precioso Peluche y de excelente calidad -león, tigre, oso motivo según disponibilidad', cantidad: 27, unidad: 'cm' },
                { nombre: 'Cereales en cajita (Choco Crispis, Zucaritas ó Froot loops, según disponibilidad)', cantidad: 25, unidad: 'gr' }
            ]
        });
    }

}

