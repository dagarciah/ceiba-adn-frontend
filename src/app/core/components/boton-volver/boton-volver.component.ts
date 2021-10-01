import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
    selector: 'app-boton-volver',
    templateUrl: 'boton-volver.component.html'
})
export class BotonVolverComponent {
    constructor(private location: Location) { }

    onVolver(): void {
        this.location.back();
    }
}
