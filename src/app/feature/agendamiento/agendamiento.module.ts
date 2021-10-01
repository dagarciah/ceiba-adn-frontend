import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { DpDatePickerModule } from 'ng2-date-picker';
import { ReactiveFormsModule } from '@angular/forms';
import { FormularioSolicitudAgendamientoComponent } from './components/formulario-solicitud-agendamiento/formulario-solicitud-agendamiento.component';
import { AgendamientoService, AgendamientoServiceImpl } from './share/service/agendamiento.service';
import { AgendamientoRoutingModule } from './agendamiento-routing.module';
import { AgendamientoComponent } from './components/agendamiento/agendamiento.component';
import { ListaAgendamientoComponent } from './components/lista-agendamiento/lista-agendamiento.component';
import { HistoricoAgendamientoComponent } from './components/historico-agendamiento/historico-agendamiento.component';
import { FormularioSeguimientoAgendamientoComponent } from './components/seguimiento-agendamiento/seguimiento-agendamiento.component';
import { CoreModule } from '@core/core.module';

@NgModule({
    declarations: [
        AgendamientoComponent,
        HistoricoAgendamientoComponent,
        ListaAgendamientoComponent,
        FormularioSolicitudAgendamientoComponent,
        FormularioSeguimientoAgendamientoComponent
    ],
    imports: [
        CoreModule,
        SharedModule,
        DpDatePickerModule,
        ReactiveFormsModule,
        AgendamientoRoutingModule
    ],
    exports: [FormularioSolicitudAgendamientoComponent],
    providers: [
        { provide: AgendamientoService, useClass: AgendamientoServiceImpl }
    ]
})
export class AgendamientoModule {

}
