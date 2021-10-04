import { Observable, of } from 'rxjs';
import { AccionConfirmado, IAlertaService } from './alerta.service';

export class AlertaServiceMock extends IAlertaService {
    valorConfirmacion = false;

    constructor(private spy: IAlertaService) {
        super();
     }

    errorInesperado(titulo: string): void {
        this.spy.errorInesperado(titulo);
    }

    informativa(titulo: string, html: string): Observable<AccionConfirmado> {
        this.spy.informativa(titulo, html);
        return of({ confirmado: this.valorConfirmacion });
    }

    confirmacion(titulo: string, html: string) {
        this.spy.confirmacion(titulo, html);
        return of({ confirmado: this.valorConfirmacion });
    }

    fueConfirmado(): void {
        this.valorConfirmacion = true;
    }

    fueCancelado(): void {
        this.valorConfirmacion = false;
    }
}
