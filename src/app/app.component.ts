import { Component } from '@angular/core';
import { MenuItem } from '@core/modelo/menu-item';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app-base';
  public companies: MenuItem[] = [
    { url: '/', nombre: 'Desayunos' },
    { url: '/agendamientos/lista', nombre: 'Agendamientos' },
    { url: '/agendamientos/seguimiento', nombre: 'Seguir Agendamiento' }
  ];

}
