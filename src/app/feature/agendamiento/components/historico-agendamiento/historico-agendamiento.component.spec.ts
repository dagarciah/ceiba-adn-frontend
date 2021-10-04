import { AgendamientoService } from '@agendamiento/share/service/agendamiento.service';
import { AgendamientoServiceStub } from '@agendamiento/share/service/agendamiento.service-stub';
import { HttpClientModule } from '@angular/common/http';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BotonVolverComponent } from '@core/components/boton-volver/boton-volver.component';
import { IAlertaService } from '@core/services/alerta.service';
import { AlertaServiceMock } from '@core/services/alerta.service-mock';
import { HttpService } from '@core/services/http.service';
import { DpDatePickerModule } from 'ng2-date-picker';
import { HistoricoAgendamientoComponent } from './historico-agendamiento.component';

describe('HistoricoAgendamientoComponent', () => {
  let component: HistoricoAgendamientoComponent;
  let fixture: ComponentFixture<HistoricoAgendamientoComponent>;
  let router;
  let alertaSpy: IAlertaService;
  let agendamientoService: AgendamientoServiceStub;

  beforeEach(waitForAsync(() => {
    router = { navigate: jasmine.createSpy('navigate') };
    alertaSpy = {
      informativa: jasmine.createSpy('informativa'),
      confirmacion: null,
      errorInesperado: jasmine.createSpy('errorInesperado')
    };
    agendamientoService = new AgendamientoServiceStub();

    TestBed.configureTestingModule({
      imports: [
        HttpClientModule, RouterTestingModule, DpDatePickerModule,
        ReactiveFormsModule
      ],
      declarations: [
        BotonVolverComponent,
        HistoricoAgendamientoComponent
      ],
      providers: [
        HttpService,
        { provide: Router, useValue: router },
        { provide: IAlertaService, useValue: new AlertaServiceMock(alertaSpy) },
        { provide: AgendamientoService, useValue: agendamientoService },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({ codigo: 'CODIGO01' })
            }
          }
        }
      ]
    })
      .compileComponents();
  }));

  it('should create', () => {
    initComponent();

    expect(component).toBeTruthy();
    expect(component.agendamiento).not.toBeNull();
  });

  it('deberia retornar ".pendiente .siguiente"', () => {
    initComponent();

    const clases = component.ngClass({ nombre: 'PENDIENTE', fechaCambio: null }, 0);

    expect(clases).toEqual({ pendiente: true, siguiente: true });
  });

  it('deberia retornar ".pendiente .siguiente"', () => {
    initComponent();

    const clases = component.ngClass({ nombre: 'PENDIENTE', fechaCambio: null }, 10);

    expect(clases).toEqual({ pendiente: true, siguiente: false });
  });

  it('deberia mostrar alerta agendamiento no encontrado', () => {
    agendamientoService.error = { error: { nombreExcepcion: 'AgendamientoNoEncontrado' } };

    initComponent();

    expect(alertaSpy.informativa).toHaveBeenCalledWith(
      component.TITULO_AGENDAMIENTO_NO_ENCONTRADO,
      component.TEXTO_AGENDAMIENTO_NO_ENCONTRADO);
  });

  it('deberia mostrar alerta error inesperado', () => {
    agendamientoService.error = { error: { nombreExcepcion: 'ErrorInseperadoXYZ' } };

    initComponent();

    expect(alertaSpy.errorInesperado)
      .toHaveBeenCalledWith(component.TITULO_ERROR_INESPERADO);
  });

  function initComponent() {
    fixture = TestBed.createComponent(HistoricoAgendamientoComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  }

});

