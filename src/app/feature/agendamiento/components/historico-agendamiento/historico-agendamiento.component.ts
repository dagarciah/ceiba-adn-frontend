import { Agendamiento, EstadoAgendamiento } from '@agendamiento/share/model/agendamiento';
import { AgendamientoService } from '@agendamiento/share/service/agendamiento.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IAlertaService } from '@core/services/alerta.service';

const AGENDAMIENTO_NO_ENCONTRADO = 'AgendamientoNoEncontrado';

@Component({
    templateUrl: './historico-agendamiento.component.html',
    styleUrls: ['./historico-agendamiento.component.css']
})
export class HistoricoAgendamientoComponent implements OnInit {
    agendamiento: Agendamiento;

    readonly TITULO_AGENDAMIENTO_NO_ENCONTRADO = 'Agendamiento No Encontrado';
    readonly TEXTO_AGENDAMIENTO_NO_ENCONTRADO = 'No hemos podido obtener un agendamiento para el codigo ingresado';
    readonly TITULO_ERROR_INESPERADO = 'Consulta de Agendamiento';

    constructor(private service: AgendamientoService, private alerta: IAlertaService, private route: ActivatedRoute) { }

    ngOnInit(): void {
        const codigo = this.route.snapshot.paramMap.get('codigo');
        this.service.detalle(codigo).subscribe({
            next: agendamiento => this.agendamiento = agendamiento,
            error: ({ error }) => {
                if (error?.nombreExcepcion === AGENDAMIENTO_NO_ENCONTRADO) {
                    this.alerta.informativa(this.TITULO_AGENDAMIENTO_NO_ENCONTRADO, this.TEXTO_AGENDAMIENTO_NO_ENCONTRADO);
                } else {
                    this.alerta.errorInesperado(this.TITULO_ERROR_INESPERADO);
                }
            }
        });
    }

    ngClass(estado: EstadoAgendamiento, index: number): { [key: string]: boolean } {
        return {
            [estado.nombre.toLowerCase()]: true,
            siguiente: index < (this.agendamiento.estados.length - 1)
        };
    }
}
