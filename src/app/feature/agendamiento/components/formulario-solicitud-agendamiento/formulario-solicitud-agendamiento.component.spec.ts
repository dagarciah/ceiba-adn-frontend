import { AgendamientoService, AgendamientoServiceStub } from '@agendamiento/share/service/agendamiento.service';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AlertaServiceMock, IAlertaService } from '@core/services/alerta.service';
import { DpDatePickerModule } from 'ng2-date-picker';
import { FormularioSolicitudAgendamientoComponent } from './formulario-solicitud-agendamiento.component';

describe('FormularioSolicitudAgendamientoComponent', () => {
  let component: FormularioSolicitudAgendamientoComponent;
  let fixture: ComponentFixture<FormularioSolicitudAgendamientoComponent>;
  let output;
  let alertaSpy: IAlertaService;
  let agendamientoService: AgendamientoServiceStub;

  beforeEach(waitForAsync(() => {
    alertaSpy = {
      informativa: jasmine.createSpy('informativa'),
      confirmacion: null,
      errorInesperado: jasmine.createSpy('errorInesperado')
    };
    output = { emit: jasmine.createSpy('emit') };
    agendamientoService = new AgendamientoServiceStub();


    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, DpDatePickerModule],
      declarations: [FormularioSolicitudAgendamientoComponent],
      providers: [
        { provide: IAlertaService, useValue: new AlertaServiceMock(alertaSpy) },
        { provide: AgendamientoService, useValue: agendamientoService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioSolicitudAgendamientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.formulario).not.toBeNull();
    expect(component.datePickerConfig).not.toBeNull();
  });

  it('deberia crear una solicitud', () => {
    component.solicitudAgendamiento = output;
    component.formulario.patchValue({
      desayuno: 1,
      fecha: '2021-09-30 07:00:00',
      direccion: 'Calle falsa 123'
    });

    component.onSolicitar();

    expect(output.emit).toHaveBeenCalled();
    expect(alertaSpy.informativa).not.toHaveBeenCalled();
    expect(alertaSpy.errorInesperado).not.toHaveBeenCalled();
  });

  it('deberia informar cuando falla al crear una solicitud', () => {
    agendamientoService.error = { error: { nombreExcepcion: 'ExcepcionFechaAgendamientoNoValida' } };
    component.formulario.patchValue({
      desayuno: 1,
      fecha: '2021-09-30 07:00:00',
      direccion: 'Calle falsa 123'
    });

    component.onSolicitar();

    expect(alertaSpy.informativa)
      .toHaveBeenCalledWith(component.TITULO_OPERACION_AGENDAMIENTO, component.TEXTO_FECHA_AGENDAMIENTO_INVALIDA);

    expect(output.emit).not.toHaveBeenCalled();
    expect(alertaSpy.errorInesperado).not.toHaveBeenCalled();
  });

  it('deberia mostrar error inesperado cuando falla al crear una solicitud', () => {
    agendamientoService.error = { error: { nombreExcepcion: 'Excepcion123' } };
    component.formulario.patchValue({
      desayuno: 1,
      fecha: '2021-09-30 07:00:00',
      direccion: 'Calle falsa 123'
    });

    component.onSolicitar();

    expect(alertaSpy.errorInesperado)
      .toHaveBeenCalledWith(component.TITULO_OPERACION_AGENDAMIENTO);
    expect(alertaSpy.informativa).not.toHaveBeenCalled();
    expect(output.emit).not.toHaveBeenCalled();
  });

});
