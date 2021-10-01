import { Agendamiento } from '@agendamiento/share/model/agendamiento';
import { AgendamientoService } from '@agendamiento/share/service/agendamiento.service';
import { Component, OnInit } from '@angular/core';
import { AlertaService } from '@core/services/alerta.service';
import { Observable } from 'rxjs';

const MAQUINA_ESTADOS = {
    PENDIENTE: 'ALISTAMIENTO',
    ALISTAMIENTO: 'DESPACHADO',
    DESPACHADO: 'ENTREGADO'
};

@Component({
    templateUrl: './lista-agendamiento.component.html',
    styleUrls: ['./lista-agendamiento.component.css']
})
export class ListaAgendamientoComponent implements OnInit {

    agendamientos: Observable<Array<Agendamiento>>;

    constructor(private service: AgendamientoService) {

    }

    ngOnInit(): void {
        this.cargar();
    }

    onCambiarEstado(agendamiento: Agendamiento) {
        const estadoActual = agendamiento.estadoActual.nombre;
        const proximoEstado = MAQUINA_ESTADOS[estadoActual];

        AlertaService.confirmacion('¿Seguro desea modificar el estado?', `El agendamiento pasar&aacute; de ${estadoActual} a ${proximoEstado}`)
            .subscribe({
                next: confirmacion => {
                    if (confirmacion.confirmado) {
                        this.service.cambiarEstado(agendamiento.id, proximoEstado)
                            .subscribe(_$ => {
                                AlertaService.informativa('Resultado de la operacion', '¡El agendamiento a sido cancelado exitosamente!');
                                this.cargar();
                            });
                    }
                },
                error: (e) => console.log(e)
            });
    }

    onCancelar(agendamiento: Agendamiento) {
        AlertaService.confirmacion('¿Seguro desea cancelar?', 'El agendamiento ser&aacute; cancelado.')
            .subscribe(confirmacion => {
                if (confirmacion.confirmado) {
                    this.service.cambiarEstado(agendamiento.id, 'CANCELADO')
                        .subscribe(_$ => {
                            AlertaService.informativa('Resultado de la operacion', '¡El agendamiento a sido cancelado exitosamente!');
                            this.cargar();
                        });
                }
            });
    }

    puedeCancelar(agendamiento: Agendamiento): boolean {
        return agendamiento.estadoActual?.nombre === 'PENDIENTE';
    }

    puedeCambiar({estadoActual: {nombre}}: Agendamiento): boolean {
        return (nombre !== 'ENTREGADO') && (nombre !== 'CANCELADO');
    }

    calcularEnlace(agendamiento: Agendamiento): string {
        return '../historico/' + agendamiento.codigo;
    }

    private cargar() {
        this.agendamientos = this.service.listar([]);
    }
}
