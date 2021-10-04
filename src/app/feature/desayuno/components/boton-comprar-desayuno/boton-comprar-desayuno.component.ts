import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-boton-comprar-desayuno',
    templateUrl: './boton-comprar-desayuno.component.html'
  })
export class BotonComprarDesayunoComponent {
  @Input() link: string;
}
