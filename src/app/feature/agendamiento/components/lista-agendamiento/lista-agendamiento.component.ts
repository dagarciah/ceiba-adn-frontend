import { Agendamiento, Estado } from '@agendamiento/share/model/agendamiento';
import { AgendamientoService } from '@agendamiento/share/service/agendamiento.service';
import { Component, OnInit } from '@angular/core';
import { IAlertaService } from '@core/services/alerta.service';
import { Observable } from 'rxjs';

const MAPA_SIGUIENTE_ESTADO = {
    PENDIENTE: 'ALISTAMIENTO',
    ALISTAMIENTO: 'DESPACHADO',
    DESPACHADO: 'ENTREGADO'
};

const ESTADO_CANCELADO = 'CANCELADO';
const ESTADO_PENDIENTE = 'PENDIENTE';
const ESTADO_ENTREGADO = 'ENTREGADO';

@Component({
    templateUrl: './lista-agendamiento.component.html',
    styleUrls: ['./lista-agendamiento.component.css']
})
export class ListaAgendamientoComponent implements OnInit {

    agendamientos: Observable<Array<Agendamiento>>;

    readonly TEXTO_CONFIRMAR_CANCELAR = 'El agendamiento ser&aacute; cancelado.';
    readonly TITULO_CONFIRMAR_CANCELAR = '¿Seguro desea cancelar?';
    readonly TITULO_RESULTADO_OPERACION = 'Resultado de la operacion';
    readonly TEXTO_CAMBIO_ESTADO_EXITOSO = '¡El estodo del agendamiento a sido cambiado exitosamente!';
    readonly TITULO_CONFIRMACION_CAMBIO_ESTADO = '¿Seguro desea modificar el estado?';

    constructor(private service: AgendamientoService, private alerta: IAlertaService) { }

    ngOnInit(): void {
        this.cargar();
    }

    onCambiarEstado(agendamiento: Agendamiento) {
        const estadoActual = agendamiento.estadoActual.nombre;
        const proximoEstado = MAPA_SIGUIENTE_ESTADO[estadoActual];

        this.alerta.confirmacion(this.TITULO_CONFIRMACION_CAMBIO_ESTADO,
            this.formatearTextoCambioEstado(estadoActual, proximoEstado))
            .subscribe(confirmacion => this.intentaCambiarEstado(confirmacion.confirmado, agendamiento.id, proximoEstado));
    }

    onCancelar(agendamiento: Agendamiento) {
        this.alerta.confirmacion(this.TITULO_CONFIRMAR_CANCELAR, this.TEXTO_CONFIRMAR_CANCELAR)
            .subscribe(confirmacion => this.intentaCambiarEstado(confirmacion.confirmado, agendamiento.id, ESTADO_CANCELADO));
    }

    puedeCancelar(agendamiento: Agendamiento): boolean {
        return agendamiento.estadoActual?.nombre === ESTADO_PENDIENTE;
    }

    puedeCambiar({ estadoActual: { nombre } }: Agendamiento): boolean {
        return (nombre !== ESTADO_ENTREGADO) && (nombre !== ESTADO_CANCELADO);
    }

    calcularEnlace(agendamiento: Agendamiento): string {
        return `../historico/${agendamiento.codigo}`;
    }

    formatearTextoCambioEstado(estadoActual: string, proximoEstado: any): string {
        return `El agendamiento pasar&aacute; de ${estadoActual} a ${proximoEstado}`;
    }

    private intentaCambiarEstado(confirmacion: boolean, agendamientoId: number, cambiarA: Estado): void {
        if (confirmacion) {
            this.service.cambiarEstado(agendamientoId, cambiarA)
                .subscribe({
                    next: _$ => {
                        this.alerta.informativa(this.TITULO_RESULTADO_OPERACION, this.TEXTO_CAMBIO_ESTADO_EXITOSO);
                        this.cargar();
                    },
                    error: (_$) => this.alerta.errorInesperado(this.TITULO_RESULTADO_OPERACION)
                });
        }
    }

    private cargar() {
        this.agendamientos = this.service.listar([]);
    }
}
