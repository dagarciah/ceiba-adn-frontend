import { FormularioSolicitudAgendamientoComponent } from '@agendamiento/components/formulario-solicitud-agendamiento/formulario-solicitud-agendamiento.component';
import { AgendamientoService, AgendamientoServiceImpl } from '@agendamiento/share/service/agendamiento.service';
import { HttpClientModule } from '@angular/common/http';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BotonVolverComponent } from '@core/components/boton-volver/boton-volver.component';
import { IAlertaService } from '@core/services/alerta.service';
import { AlertaServiceMock } from '@core/services/alerta.service-mock';
import { HttpService } from '@core/services/http.service';
import { DesayunoService } from '@desayuno/share/service/desayuno.service';
import { DesayunoServiceStub } from '@desayuno/share/service/desayuno.service-stub';
import { DpDatePickerModule } from 'ng2-date-picker';
import { DetalleDesayunoComponent } from './detalle-desayuno.component';

describe('DetalleDesayunoComponent', () => {
  let component: DetalleDesayunoComponent;
  let fixture: ComponentFixture<DetalleDesayunoComponent>;
  const alertaSpy = { informativa: jasmine.createSpy('informativa'), confirmacion: null, errorInesperado: null };
  const router = { navigate: jasmine.createSpy('navigate') };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule, RouterTestingModule, DpDatePickerModule,
        ReactiveFormsModule
      ],
      declarations: [
        DetalleDesayunoComponent,
        FormularioSolicitudAgendamientoComponent,
        BotonVolverComponent
      ],
      providers: [
        { provide: Router, useValue: router },
        { provide: IAlertaService, useValue: new AlertaServiceMock(alertaSpy) },
        HttpService, {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({ id: 1 })
            }
          }
        },
        { provide: DesayunoService, useClass: DesayunoServiceStub },
        { provide: AgendamientoService, useClass: AgendamientoServiceImpl }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleDesayunoComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.desayunoId).toEqual(1);
    expect(component.desayuno.id).toEqual(1);
  });

  it('deberia llamar alerta informativa', () => {
    const parametros = { codigo: 'COFIGO01', estado: 'PENDIENTE' };
    component.onAgendamientoSolicitado(parametros);
    expect(alertaSpy.informativa)
      .toHaveBeenCalledWith(component.TITULO_ALERTA, component.formatearMensaje(parametros.codigo, parametros.estado));
    expect(router.navigate)
      .toHaveBeenCalledWith(['/desayunos/lista']);
  });
});

