import { Agendamiento, EstadoAgendamiento } from '@agendamiento/share/model/agendamiento';
import { AgendamientoService } from '@agendamiento/share/service/agendamiento.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertaService } from '@core/services/alerta.service';

@Component({
    templateUrl: './historico-agendamiento.component.html',
    styleUrls: ['./historico-agendamiento.component.css']
})
export class HistoricoAgendamientoComponent implements OnInit {
    agendamiento: Agendamiento;

    constructor(private service: AgendamientoService, private route: ActivatedRoute) { }

    ngOnInit(): void {
        const codigo = this.route.snapshot.paramMap.get('codigo');
        this.service.detalle(codigo).subscribe({
            next: _$ => this.agendamiento = _$,
            error: (e) => {
                if (e.error?.nombreExcepcion === 'AgendamientoNoEncontrado') {
                    AlertaService.informativa(
                        'Agendamiento No Encontrado',
                        'No hemos podido obtener un agendamiento para el codigo ingresado'
                    )
                } else {
                    AlertaService.errorInesperado('Consulta de Agendamiento');
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
