import { Agendamiento } from '@agendamiento/share/model/agendamiento';
import { AgendamientoService, AgendamientoServiceStub } from '@agendamiento/share/service/agendamiento.service';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AlertaServiceMock, IAlertaService } from '@core/services/alerta.service';
import { Observable } from 'rxjs';
import { ListaAgendamientoComponent } from './lista-agendamiento.component';

describe('ListaAgendamientoComponent', () => {
  let component: ListaAgendamientoComponent;
  let fixture: ComponentFixture<ListaAgendamientoComponent>;
  let alertaSpy;
  let alertaServiceMock;
  let agendamientoServiceStub;
  beforeEach(waitForAsync(() => {
    alertaSpy = {
      informativa: jasmine.createSpy('informativa'),
      confirmacion: jasmine.createSpy('informativa'),
      errorInesperado: jasmine.createSpy('informativa')
    };

    alertaServiceMock = new AlertaServiceMock(alertaSpy);
    agendamientoServiceStub = new AgendamientoServiceStub();

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule],
      declarations: [ListaAgendamientoComponent],
      providers: [
        { provide: AgendamientoService, useValue: agendamientoServiceStub },
        { provide: IAlertaService, useValue: alertaServiceMock },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaAgendamientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.agendamientos).toBeInstanceOf(Observable);
  });

  it('deberia cambiar el estado del agendamiento', () => {
    const estadoActual = { nombre: 'PENDIENTE' };
    const agendamiento = { id: 1, estadoActual };
    const proximoEstado = 'ALISTAMIENTO';

    alertaServiceMock.fueConfirmado();
    agendamientoServiceStub.error = null;

    component.onCambiarEstado(agendamiento as Agendamiento);

    expect(alertaSpy.confirmacion).toHaveBeenCalledWith(
      component.TITULO_CONFIRMACION_CAMBIO_ESTADO,
      component.formatearTextoCambioEstado(estadoActual.nombre, proximoEstado));

    expect(alertaSpy.informativa).toHaveBeenCalledWith(
      component.TITULO_RESULTADO_OPERACION,
      component.TEXTO_CAMBIO_ESTADO_EXITOSO);
  });

  it('no deberia cambiar el estado del agendamiento', () => {
    const estadoActual = { nombre: 'PENDIENTE' };
    const agendamiento = { id: 1, estadoActual };
    const proximoEstado = 'ALISTAMIENTO';

    alertaServiceMock.fueCancelado();
    agendamientoServiceStub.error = null;

    component.onCambiarEstado(agendamiento as Agendamiento);

    expect(alertaSpy.confirmacion).toHaveBeenCalledWith(
      component.TITULO_CONFIRMACION_CAMBIO_ESTADO,
      component.formatearTextoCambioEstado(estadoActual.nombre, proximoEstado));

    expect(alertaSpy.informativa).not.toHaveBeenCalled();
  });

  it('deberia mostrar alerta cuando falla el cambio de estado del agendamiento', () => {
    const estadoActual = { nombre: 'PENDIENTE' };
    const agendamiento = { id: 1, estadoActual };
    const proximoEstado = 'ALISTAMIENTO';

    alertaServiceMock.fueConfirmado();
    agendamientoServiceStub.error = { mensaje: 'Fallo' };

    component.onCambiarEstado(agendamiento as Agendamiento);

    expect(alertaSpy.confirmacion).toHaveBeenCalledWith(
      component.TITULO_CONFIRMACION_CAMBIO_ESTADO,
      component.formatearTextoCambioEstado(estadoActual.nombre, proximoEstado));

    expect(alertaSpy.errorInesperado).toHaveBeenCalledWith(
      component.TITULO_RESULTADO_OPERACION);
  });

  it('deberia cancelar el agendamiento', () => {
    const estadoActual = { nombre: 'PENDIENTE' };
    const agendamiento = { id: 1, estadoActual };

    alertaServiceMock.fueConfirmado();
    agendamientoServiceStub.error = null;

    component.onCancelar(agendamiento as Agendamiento);

    expect(alertaSpy.confirmacion).toHaveBeenCalledWith(
      component.TITULO_CONFIRMAR_CANCELAR,
      component.TEXTO_CONFIRMAR_CANCELAR);

    expect(alertaSpy.informativa).toHaveBeenCalledWith(
      component.TITULO_RESULTADO_OPERACION,
      component.TEXTO_CAMBIO_ESTADO_EXITOSO);
  });

  it('deberia calcular el enlace', () => {
    const codigo = 'CODIGO01';
    const enlace = component.calcularEnlace({ codigo } as Agendamiento);

    expect(enlace).toEqual(`../historico/${codigo}`);
  });

  it('deberia poder cancelar el agendamiento', () => {
    const nombre = 'PENDIENTE';
    const puedeCancelar = component.puedeCancelar({ estadoActual: { nombre } } as Agendamiento);

    expect(puedeCancelar).toBeTrue();
  });

  it('no deberia poder cancelar el agendamiento', () => {
    const nombre = 'ALISTAMIENTO';
    const puedeCancelar = component.puedeCancelar({ estadoActual: { nombre } } as Agendamiento);

    expect(puedeCancelar).toBeFalse();
  });

  it('deberia poder cambiar el estado del agendamiento', () => {
    const nombre = 'PENDIENTE';
    const puedeCambiar = component.puedeCambiar({ estadoActual: { nombre } } as Agendamiento);

    expect(puedeCambiar).toBeTrue();
  });

  it('no deberia poder cambiar el estado del agendamiento', () => {
    const nombre = 'CANCELADO';
    const puedeCambiar = component.puedeCambiar({ estadoActual: { nombre } } as Agendamiento);

    expect(puedeCambiar).toBeFalse();
  });
});
