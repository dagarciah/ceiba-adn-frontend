import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { environment } from 'src/environments/environment';
import { HttpService } from 'src/app/core/services/http.service';
import { HttpResponse } from '@angular/common/http';
import { DesayunoService, DesayunoServiceImpl } from './desayuno.service';
import { Desayuno } from '../model/desayuno';
import { DetalleDesayuno } from '../model/detalle-desayuno';

describe('DesayunoService', () => {
  let httpMock: HttpTestingController;
  let service: DesayunoService;
  const apiEndpointDesayuno = `${environment.endpoint}/desayuno`;

  beforeEach(() => {
    const injector = TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{provide: DesayunoService, useClass: DesayunoServiceImpl}, HttpService]
    });
    httpMock = injector.inject(HttpTestingController);
    service = TestBed.inject(DesayunoService);
  });

  it('should be created', () => {
    const desayunoService: DesayunoService = TestBed.inject(DesayunoService);
    expect(desayunoService).toBeTruthy();
  });

  it('deberia listar los desayunos', () => {
    const dummyDesayunos = [
      new DesayunoDataTestBuilder().build(),
      new DesayunoDataTestBuilder().build()
    ];
    service.listar().subscribe(desayunos => {
      expect(desayunos.length).toBe(2);
      expect(desayunos).toEqual(dummyDesayunos);
    });
    const req = httpMock.expectOne(apiEndpointDesayuno);
    expect(req.request.method).toBe('GET');
    req.flush(dummyDesayunos);
  });

  it('deberia encontrar un desayuno', () => {
    const dummyDesayuno = new DesayunoDataTestBuilder().build();
    service.detalle(dummyDesayuno.id).subscribe((respuesta) => {
      expect(respuesta).toEqual(dummyDesayuno);
    });
    const req = httpMock.expectOne(`${apiEndpointDesayuno}/1`);
    expect(req.request.method).toBe('GET');
    req.event(new HttpResponse<Desayuno>({ body: dummyDesayuno }));
  });

});

class DesayunoDataTestBuilder {
  id: number;
  nombre: string;
  descripcion?: string;
  imagen: string;
  precio: number;
  detalle?: Array<DetalleDesayuno>;

  constructor() {
    this.id = 1;
    this.nombre = 'Desayuno';
    this.descripcion = 'Descripcion';
    this.imagen = 'Imagen';
    this.precio = 0;
    this.detalle = [{ nombre: 'Detalle', cantidad: 1, unidad: 'und' }];
  }

  build(): Desayuno {
    return {
      id: this.id,
      nombre: this.nombre,
      descripcion: this.descripcion,
      imagen: this.imagen,
      precio: this.precio,
      detalle: this.detalle
    };
  }
}
