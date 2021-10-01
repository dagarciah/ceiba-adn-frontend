import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SecurityGuard } from '@core/guard/security.guard';

const routes: Routes = [
  { path: '', redirectTo: '/desayunos/lista', pathMatch: 'full' },
  {
    path: 'desayunos',
    loadChildren: () => import('@desayuno/desayuno.module').then(mod => mod.DesayunoModule),
    canActivate: [SecurityGuard]
  },
  { path: 'agendamientos', loadChildren: () => import('@agendamiento/agendamiento.module').then(mod => mod.AgendamientoModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
