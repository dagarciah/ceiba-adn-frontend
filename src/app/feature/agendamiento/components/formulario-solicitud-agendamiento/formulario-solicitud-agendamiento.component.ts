import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormularioSolicitudAgendamiento } from '@agendamiento/share/model/solicitud-agendamiento';
import datePickerConfig from '@agendamiento/share/model/datepicker-config';
import { IDatePickerConfig } from 'ng2-date-picker';
import { AgendamientoService } from '@agendamiento/share/service/agendamiento.service';
import { ResultadoAgendamiento } from '@agendamiento/share/model/resultado-agendamiento';
import { AlertaService } from '@core/services/alerta.service';

@Component({
    selector: 'app-formulario-solicitud-agendamiento',
    templateUrl: './formulario-solicitud-agendamiento.component.html',
    styleUrls: ['./formulario-solicitud-agendamiento.component.css']
})
export class FormularioSolicitudAgendamientoComponent implements OnInit {
    @Input() desayunoId: number;
    @Output() solicitudAgendamiento = new EventEmitter<ResultadoAgendamiento>();
    formulario: FormularioSolicitudAgendamiento;

    constructor(private service: AgendamientoService) {
    }

    ngOnInit(): void {
        this.formulario = new FormularioSolicitudAgendamiento(this.desayunoId);
    }

    onSolicitar(): void {
        this.service.crear(this.formulario.Valor)
            .subscribe({
                next: resultado => this.solicitudAgendamiento.emit(resultado),
                error: (e) => {
                    if (e.error?.nombreExcepcion === 'ExcepcionFechaAgendamientoNoValida') {
                        AlertaService.informativa(
                            'Error de agendamiento',
                            'Recuerda que solo los agendamientos realizados de Lunes a Sabado entre 8am y 12 m podran ser agendados para el siguiente dia. En caso contrario se deberaa agendar para un dia despues del proximo dia habil.'
                        );
                    } else {
                        AlertaService.errorInesperado('Consulta de Agendamiento');
                    }
                }
            });
    }

    get datePickerConfig(): IDatePickerConfig {
        return datePickerConfig;
    }
}
