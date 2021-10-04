import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormularioSolicitudAgendamiento } from '@agendamiento/share/model/solicitud-agendamiento';
import DatePickerConfiguration from '@agendamiento/share/model/datepicker-config';
import { IDatePickerConfig } from 'ng2-date-picker';
import { AgendamientoService } from '@agendamiento/share/service/agendamiento.service';
import { ResultadoAgendamiento } from '@agendamiento/share/model/resultado-agendamiento';
import { IAlertaService } from '@core/services/alerta.service';

const FECHA_AGENDAMIENTO_NO_VALIDA = 'ExcepcionFechaAgendamientoNoValida';
@Component({
    selector: 'app-formulario-solicitud-agendamiento',
    templateUrl: './formulario-solicitud-agendamiento.component.html',
    styleUrls: ['./formulario-solicitud-agendamiento.component.css']
})
export class FormularioSolicitudAgendamientoComponent implements OnInit {
    @Input() desayunoId: number;
    @Output() solicitudAgendamiento = new EventEmitter<ResultadoAgendamiento>();
    formulario: FormularioSolicitudAgendamiento;

    readonly TITULO_OPERACION_AGENDAMIENTO = 'Error de agendamiento';
    readonly TEXTO_FECHA_AGENDAMIENTO_INVALIDA = 'Recuerda que solo los agendamientos realizados de Lunes a Sabado entre 8am y 12m '
        + 'podran ser agendados para el siguiente dia. En caso contrario se deberaa agendar para un dia despues del proximo dia habil.';

    constructor(private service: AgendamientoService, private alerta: IAlertaService) {
    }

    ngOnInit(): void {
        this.formulario = new FormularioSolicitudAgendamiento(this.desayunoId);
    }

    onSolicitar(): void {
        if (this.formulario.valid) {
            this.service.crear(this.formulario.valor)
                .subscribe({
                    next: resultado => this.solicitudAgendamiento.emit(resultado),
                    error: ({ error }) => {
                        if (error?.nombreExcepcion === FECHA_AGENDAMIENTO_NO_VALIDA) {
                            this.alerta.informativa(this.TITULO_OPERACION_AGENDAMIENTO,
                                this.TEXTO_FECHA_AGENDAMIENTO_INVALIDA);
                        } else {
                            this.alerta.errorInesperado(this.TITULO_OPERACION_AGENDAMIENTO);
                        }
                    }
                });
        }
    }

    get datePickerConfig(): IDatePickerConfig {
        return DatePickerConfiguration;
    }
}
