import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http.service';
import { Desayuno } from '@desayuno/share/model/desayuno';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export abstract class DesayunoService {
    abstract listar(): Observable<Array<Desayuno>>;
    abstract detalle(id: number): Observable<Desayuno>;
}

@Injectable()
export class DesayunoServiceImpl extends DesayunoService {

    constructor(private http: HttpService) {
        super();
    }

    listar(): Observable<Array<Desayuno>> {
        return this.http.doGet(`${environment.endpoint}/desayuno`);
    }

    detalle(id: number): Observable<Desayuno> {
        return this.http.doGet(`${environment.endpoint}/desayuno/${id}`);
    }

}
