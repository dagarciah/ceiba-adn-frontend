import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertaService } from '@core/services/alerta.service';
import { Desayuno } from '@desayuno/share/model/Desayuno';
import { DesayunoService } from '@desayuno/share/service/desayuno.service';

@Component({
    templateUrl: './detalle-desayuno.component.html',
    styleUrls: ['./detalle-desayuno.component.css']
})
export class DetalleDesayunoComponent implements OnInit {
    desayunoId: number;
    desayuno: Desayuno;

    constructor(private service: DesayunoService, private route: ActivatedRoute, private router: Router) {}

    ngOnInit(): void {
        this.desayunoId = parseInt(this.route.snapshot.paramMap.get('id'), 10);
        this.service.detalle(this.desayunoId).subscribe(_$ => this.desayuno = _$);
    }

    onAgendamientoSolicitado({codigo, estado}) {
        AlertaService.informativa('Operacion Comfirmada', `Se ha creado el agendamiento '${codigo}' se encuentra en estado '${estado}'.`)
            .subscribe(_$ => this.router.navigate(['/desayunos/lista']));
    }
}
