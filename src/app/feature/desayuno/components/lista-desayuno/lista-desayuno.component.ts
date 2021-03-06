import { Component, OnInit } from '@angular/core';
import { Desayuno } from '@desayuno/share/model/desayuno';
import { DesayunoService } from '@desayuno/share/service/desayuno.service';
import { Observable } from 'rxjs';

@Component({
    templateUrl: './lista-desayuno.component.html',
    styleUrls: ['./lista-desayuno.component.css']
})
export class ListaDesayunoComponent implements OnInit {
    desayunos: Observable<Array<Desayuno>>;
    constructor(private service: DesayunoService) {}
    
    ngOnInit(): void {
        this.desayunos = this.service.listar();
    }
}
