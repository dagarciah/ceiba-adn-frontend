import { Observable, of, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { Agendamiento, Estado, EstadoAgendamiento } from '../model/agendamiento';
import { ResultadoAgendamiento } from '../model/resultado-agendamiento';
import { SolicitudAgendamiento } from '../model/solicitud-agendamiento';
import { AgendamientoService } from './agendamiento.service';
import { map } from 'rxjs/operators';

@Injectable()
export class AgendamientoServiceStub extends AgendamientoService {
    error: { error: { nombreExcepcion: string } };

    crear(_$: SolicitudAgendamiento): Observable<ResultadoAgendamiento> {
        if (!!this.error) {
            return throwError(this.error);
        }

        return of({
            codigo: 'DASDWER4',
            estado: 'PENDIENTE'
        });
    }

    listar(_$?: Estado[]): Observable<Array<Agendamiento>> {
        if (!!this.error) {
            return throwError(this.error);
        }

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
    detalle(_$: string): Observable<Agendamiento> {
        if (!!this.error) {
            return throwError(this.error);
        }

        return this.listar().pipe(map(l => l[0]));
    }

    cambiarEstado(_$: number): Observable<EstadoAgendamiento> {
        if (!!this.error) {
            return throwError(this.error);
        }

        return of({ nombre: 'CANCELADO', fechaCambio: '2021-09-28 13:24:03' });
    }
}
