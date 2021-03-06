import { NgModule } from '@angular/core';
import { BotonComprarDesayunoComponent } from './components/boton-comprar-desayuno/boton-comprar-desayuno.component';
import { ListaDesayunoComponent } from './components/lista-desayuno/lista-desayuno.component';
import { VistaPreviaDesayunoComponent } from './components/vista-previa-desayuno/vista-previa-desayuno.component';
import { SharedModule } from '@shared/shared.module';
import { DetalleDesayunoComponent } from './components/detalle-desayuno/detalle-desayuno.component';
import { DesayunoRoutingModule } from './desayuno-routing.module';
import { DesayunoComponent } from './components/desayuno/desayuno.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DesayunoService, DesayunoServiceImpl } from './share/service/desayuno.service';
import { AgendamientoModule } from '@agendamiento/agendamiento.module';
import { CoreModule } from '@core/core.module';
import { AlertaService, IAlertaService } from '@core/services/alerta.service';

@NgModule({
    declarations: [
        DesayunoComponent,
        DetalleDesayunoComponent,
        BotonComprarDesayunoComponent,
        VistaPreviaDesayunoComponent,
        ListaDesayunoComponent
    ],
    imports: [
        CoreModule,
        SharedModule,
        AgendamientoModule,
        DesayunoRoutingModule,
        ReactiveFormsModule
    ],
    providers: [
        { provide: IAlertaService, useClass: AlertaService},
        { provide: DesayunoService, useClass: DesayunoServiceImpl }
    ]
})
export class DesayunoModule {

}
