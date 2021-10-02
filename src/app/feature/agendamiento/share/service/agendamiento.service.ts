import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService, Options } from '@core/services/http.service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Agendamiento, Estado, EstadoAgendamiento } from '../model/agendamiento';
import { ResultadoAgendamiento } from '../model/resultado-agendamiento';
import { SolicitudAgendamiento } from '../model/solicitud-agendamiento';

export abstract class AgendamientoService {
    abstract crear(solicitud: SolicitudAgendamiento): Observable<ResultadoAgendamiento>;
    abstract listar(estados: Array<Estado>): Observable<Array<Agendamiento>>;
    abstract detalle(codigo: string): Observable<Agendamiento>;
    abstract cambiarEstado(id: number, estado: Estado): Observable<EstadoAgendamiento>;
}

@Injectable()
export class AgendamientoServiceImpl extends AgendamientoService {

    constructor(private http: HttpService) {
        super();
    }

    crear(solicitud: SolicitudAgendamiento): Observable<ResultadoAgendamiento> {
        return this.http.doPost<SolicitudAgendamiento, {valor: ResultadoAgendamiento}>(`${environment.endpoint}/agendamiento`, solicitud)
            .pipe(map(res => res.valor));
    }

    listar(estados?: Estado[]): Observable<Array<Agendamiento>> {
        let params = new HttpParams();
        (estados || []).forEach(estado => params = params.append('estado', estado));

        return this.http.doGet(`${environment.endpoint}/agendamiento`, { params });
    }

    detalle(codigo: string): Observable<Agendamiento> {
        return this.http.doGet(`${environment.endpoint}/agendamiento/${codigo}`);
    }

    cambiarEstado(id: number, estado: Estado): Observable<EstadoAgendamiento> {
        const options: Options = { params: new HttpParams().set('estado', estado) };
        return this.http.doPatch(`${environment.endpoint}/agendamiento/${id}`, null, options);
    }
}

@Injectable()
export class AgendamientoServiceStub extends AgendamientoService {

    crear(_solicitud: SolicitudAgendamiento): Observable<ResultadoAgendamiento> {
        return of({
            codigo: 'DASDWER4',
            estado: 'PENDIENTE'
        });
    }

    listar(_estados?: Estado[]): Observable<Array<Agendamiento>> {
        return of([{
            id: 1,
            codigo: 'DASDWER4',
            desayunoId: 1,
            programacion: '2021-09-28 11:00:00',
            estadoActual: { nombre: 'PENDIENTE', fechaCambio: '2021-09-28 13:24:03' },
            estados: [
                { nombre: 'PENDIENTE', fechaCambio: '2021-09-28 13:24:03' },
                { nombre: 'ALISTAMIENTO', fechaCambio: '2021-09-28 13:24:03' },
                { nombre: 'DESPACHADO', fechaCambio: '2021-09-28 13:24:03' },
                { nombre: 'ENTREGADO', fechaCambio: '2021-09-28 13:24:03' },
                { nombre: 'CANCELADO', fechaCambio: '2021-09-28 13:24:03' }
            ]
        }]);
    }
    detalle(_codigo: string): Observable<Agendamiento> {
        return this.listar().pipe(map(l => l[0]));
    }

    cambiarEstado(_id: number): Observable<EstadoAgendamiento> {
        return of({ nombre: 'CANCELADO', fechaCambio: '2021-09-28 13:24:03' }); 
    }
}
