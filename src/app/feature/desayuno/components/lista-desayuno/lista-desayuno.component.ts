import { Component } from '@angular/core';
import { Desayuno } from '@desayuno/share/model/desayuno';
import { DesayunoService } from '@desayuno/share/service/desayuno.service';
import { Observable } from 'rxjs';

@Component({
    templateUrl: './lista-desayuno.component.html',
    styleUrls: ['./lista-desayuno.component.css']
})
export class ListaDesayunoComponent {
    desayunos: Observable<Array<Desayuno>>;
    constructor(service: DesayunoService) {
        this.desayunos = service.listar();
    }
}
