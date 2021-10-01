import { FormControl, FormGroup, Validators } from '@angular/forms';

export class FormularioSolicitudAgendamiento extends FormGroup {
    constructor(desayunoId: number) {
        super({
            desayuno: new FormControl(desayunoId, [Validators.required]),
            fecha: new FormControl(null, [Validators.required]),
            direccion: new FormControl(null, [Validators.required]),
            franja: new FormControl(null, [])
        });
    }

    get Valor(): SolicitudAgendamiento {
        const {fecha, direccion, desayuno, franja} = this.value;
        return {
            direccion,
            desayuno,
            fecha: `${fecha.format('YYYY-MM-DD')} ${franja}`
        };
    }
}

export interface SolicitudAgendamiento {
    desayuno: number;
    direccion: string;
    fecha: string;
}
