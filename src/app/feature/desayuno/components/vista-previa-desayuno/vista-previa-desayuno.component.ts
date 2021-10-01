import { Component, Input } from '@angular/core';
import { Desayuno } from '@desayuno/share/model/Desayuno';

@Component({
  selector: 'app-vista-previa-desayuno',
  templateUrl: './vista-previa-desayuno.component.html',
  styleUrls: ['./vista-previa-desayuno.component.css']
})
export class VistaPreviaDesayunoComponent {
  @Input()
  desayuno: Desayuno;

}
