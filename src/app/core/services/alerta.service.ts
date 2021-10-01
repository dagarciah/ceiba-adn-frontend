import { from, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import Swal from 'sweetalert2';

export class AlertaService {
    static errorInesperado(titulo: string) {
        Swal.fire({
            html: 'Ocurrio un error inesperado, por favor contacte al administrador',
            title: titulo,
            icon: 'error',
            showCloseButton: true,
            showConfirmButton: false,
            cancelButtonText: 'Cerrar'
        });
    }
    static confirmacion(titulo: string, html: string) {
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
    static informativa(titulo: string, html: string): Observable<AccionConfirmado> {
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
