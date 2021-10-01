import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DesayunoComponent } from './components/desayuno/desayuno.component';
import { DetalleDesayunoComponent } from './components/detalle-desayuno/detalle-desayuno.component';
import { ListaDesayunoComponent } from './components/lista-desayuno/lista-desayuno.component';

const routes: Routes = [
  {
    path: '',
    component: DesayunoComponent,
    children: [
      { path: 'lista', component: ListaDesayunoComponent },
      { path: 'detalle/:id', component: DetalleDesayunoComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DesayunoRoutingModule { }
