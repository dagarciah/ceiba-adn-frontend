import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgendamientoComponent } from './components/agendamiento/agendamiento.component';
import { HistoricoAgendamientoComponent } from './components/historico-agendamiento/historico-agendamiento.component';
import { ListaAgendamientoComponent } from './components/lista-agendamiento/lista-agendamiento.component';
import { FormularioSeguimientoAgendamientoComponent } from './components/seguimiento-agendamiento/seguimiento-agendamiento.component';

const routes: Routes = [
  {
    path: 'agendamientos',
    component: AgendamientoComponent,
    children: [
      { path: 'lista', component: ListaAgendamientoComponent },
      { path: 'historico/:codigo', component: HistoricoAgendamientoComponent },
      { path: 'seguimiento', component: FormularioSeguimientoAgendamientoComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgendamientoRoutingModule { }
