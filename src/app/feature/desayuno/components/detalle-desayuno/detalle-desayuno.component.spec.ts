import { FormularioSolicitudAgendamientoComponent } from '@agendamiento/components/formulario-solicitud-agendamiento/formulario-solicitud-agendamiento.component';
import { AgendamientoService, AgendamientoServiceImpl } from '@agendamiento/share/service/agendamiento.service';
import { HttpClientModule } from '@angular/common/http';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BotonVolverComponent } from '@core/components/boton-volver/boton-volver.component';
import { HttpService } from '@core/services/http.service';
import { DesayunoService, DesayunoServiceStub } from '@desayuno/share/service/desayuno.service';
import { DpDatePickerModule } from 'ng2-date-picker';
import { DetalleDesayunoComponent } from './detalle-desayuno.component';

describe('DetalleDesayunoComponent', () => {
  let component: DetalleDesayunoComponent;
  let fixture: ComponentFixture<DetalleDesayunoComponent>;

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
      providers: [HttpService, {
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
});
