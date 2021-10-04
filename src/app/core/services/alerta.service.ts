import { Injectable } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import Swal from 'sweetalert2';

export abstract class IAlertaService {
    abstract errorInesperado(titulo: string): void;
    abstract confirmacion(titulo: string, html: string): Observable<AccionConfirmado>;
    abstract informativa(titulo: string, html: string): Observable<AccionConfirmado>;
}

@Injectable()
export class AlertaService extends IAlertaService {
    errorInesperado(titulo: string) {
        Swal.fire({
            html: 'Ocurrio un error inesperado, por favor contacte al administrador',
            title: titulo,
            icon: 'error',
            showCloseButton: true,
            showConfirmButton: false,
            cancelButtonText: 'Cerrar'
        });
    }

    confirmacion(titulo: string, html: string): Observable<AccionConfirmado> {
        return from(
            Swal.fire({
                html,
                title: titulo,
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Confrimar',
                cancelButtonText: 'Cancelar'
            })
        ).pipe(switchMap(a => of({ confirmado: a.isConfirmed })));
    }

    informativa(titulo: string, html: string): Observable<AccionConfirmado> {
        return from(
            Swal.fire({
                html,
                title: titulo,
                icon: 'info',
                confirmButtonText: 'Aceptar'
            })
        ).pipe(switchMap(a => of({ confirmado: a.isConfirmed })));
    }
}

export interface AccionConfirmado {
    confirmado: boolean;
}
