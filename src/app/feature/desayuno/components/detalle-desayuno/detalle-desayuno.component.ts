import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IAlertaService } from '@core/services/alerta.service';
import { Desayuno } from '@desayuno/share/model/desayuno';
import { DesayunoService } from '@desayuno/share/service/desayuno.service';

@Component({
    templateUrl: './detalle-desayuno.component.html',
    styleUrls: ['./detalle-desayuno.component.css']
})
export class DetalleDesayunoComponent implements OnInit {
    readonly TITULO_ALERTA = 'Operacion Comfirmada';

    desayunoId: number;
    desayuno: Desayuno;

    constructor(private service: DesayunoService, private alerta: IAlertaService, private route: ActivatedRoute, private router: Router) { }

    ngOnInit(): void {
        this.desayunoId = parseInt(this.route.snapshot.paramMap.get('id'), 10);
        this.service.detalle(this.desayunoId).subscribe(_$ => this.desayuno = _$);
    }

    onAgendamientoSolicitado({ codigo, estado }) {
        this.alerta.informativa(this.TITULO_ALERTA, this.formatearMensaje(codigo, estado))
            .subscribe(_$ => this.router.navigate(['/desayunos/lista']));
    }

    formatearMensaje(codigo: string, estado: string): string {
        return `Se ha creado el agendamiento '${codigo}' se encuentra en estado '${estado}'.`;
    }
}
