import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';
import { HttpService } from 'src/app/core/services/http.service';
import { HttpResponse } from '@angular/common/http';
import { AgendamientoService, AgendamientoServiceImpl } from './agendamiento.service';
import { Agendamiento, Estado, EstadoAgendamiento } from '../model/agendamiento';
import { ResultadoAgendamiento } from '../model/resultado-agendamiento';

describe('AgendamientoService', () => {
  let httpMock: HttpTestingController;
  let service: AgendamientoService;
  const apiEndpointAgendamiento = `${environment.endpoint}/agendamiento`;

  beforeEach(() => {
    const injector = TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: AgendamientoService, useClass: AgendamientoServiceImpl }, HttpService]
    });
    httpMock = injector.inject(HttpTestingController);
    service = TestBed.inject(AgendamientoService);
  });

  it('should be created', () => {
    const agendamientoService: AgendamientoService = TestBed.inject(AgendamientoService);
    expect(agendamientoService).toBeTruthy();
  });

  it('deberia listar productos', () => {
    const dummyAgendamientos = [
      new AgendamientoTestDataBuilder().build(),
      new AgendamientoTestDataBuilder().build()
    ];
    service.listar([]).subscribe(agendamientos => {
      expect(agendamientos.length).toBe(2);
      expect(agendamientos).toEqual(dummyAgendamientos);
    });
    const req = httpMock.expectOne(apiEndpointAgendamiento);
    expect(req.request.method).toBe('GET');
    req.flush(dummyAgendamientos);
  });

  it('deberia crear un agendamiento', () => {
    const dummyRespuesta = { codigo: 'CODIGO01', estado: 'PENDIENTE' as Estado };
    const dummySolicitud = { fecha: '2021-09-30 07:00:00', direccion: 'Calle falsa 123', desayuno: 1 };
    service.crear(dummySolicitud).subscribe((respuesta) => {
      expect(respuesta).toEqual(dummyRespuesta);
    });
    const req = httpMock.expectOne(apiEndpointAgendamiento);
    expect(req.request.method).toBe('POST');
    req.event(new HttpResponse<{ valor: ResultadoAgendamiento }>({ body: { valor: dummyRespuesta } }));
  });

  it('deberia encontrar un agendamiento', () => {
    const dummyAgendamiento = new AgendamientoTestDataBuilder().build();
    service.detalle(dummyAgendamiento.codigo).subscribe((respuesta) => {
      expect(respuesta).toEqual(dummyAgendamiento);
    });
    const req = httpMock.expectOne(`${apiEndpointAgendamiento}/${dummyAgendamiento.codigo}`);
    expect(req.request.method).toBe('GET');
    req.event(new HttpResponse<Agendamiento>({ body: dummyAgendamiento }));
  });

  it('deberia actualizar el estado del agendamiento', () => {
    const dummyAgendamiento = { nombre: 'ALISTAMIENTO', fechaCambio: '2021-09-28 11:98:00' };
    service.cambiarEstado(1, 'PENDIENTE').subscribe((respuesta) => {
      expect(respuesta).toEqual(dummyAgendamiento);
    });
    const req = httpMock.expectOne(`${apiEndpointAgendamiento}/1?estado=PENDIENTE`);
    expect(req.request.method).toBe('PATCH');
    req.event(new HttpResponse<EstadoAgendamiento>({ body: dummyAgendamiento }));
  });
});


class AgendamientoTestDataBuilder {
  id: number;
  desayunoId: number;
  codigo: string;
  programacion: string;
  estados: Array<EstadoAgendamiento>;
  estadoActual?: EstadoAgendamiento;

  constructor() {
    this.id = 1;
    this.desayunoId = 1;
    this.codigo = 'CODIGO01';
    this.programacion = '2021-09-30 07:00:00';
    this.estadoActual = { nombre: 'PENDIENTE', fechaCambio: '2021-09-28 11:55:43' };
    this.estados = [this.estadoActual];
  }

  build(): Agendamiento {
    return {
      id: this.id,
      desayunoId: this.desayunoId,
      codigo: this.codigo,
      programacion: this.programacion,
      estadoActual: this.estadoActual,
      estados: this.estados
    };
  }
}
