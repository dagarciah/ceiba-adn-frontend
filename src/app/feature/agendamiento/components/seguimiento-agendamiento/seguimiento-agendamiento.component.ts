import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    templateUrl: './seguimiento-agendamiento.component.html',
    styleUrls: ['./seguimiento-agendamiento.component.css']
})
export class FormularioSeguimientoAgendamientoComponent {
    formulario: FormControl = new FormControl(null, [Validators.required]);

    constructor(private router: Router) { }

    onConsultar(): void {
        if (this.formulario.valid) {
            this.router.navigate([`agendamientos/historico/${this.formulario.value}`]);
        }
    }
}
