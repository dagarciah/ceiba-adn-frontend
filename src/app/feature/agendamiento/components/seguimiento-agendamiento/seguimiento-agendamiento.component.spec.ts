import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { FormularioSeguimientoAgendamientoComponent } from './seguimiento-agendamiento.component';

describe('FormularioSeguimientoAgendamientoComponent', () => {
  let component: FormularioSeguimientoAgendamientoComponent;
  let fixture: ComponentFixture<FormularioSeguimientoAgendamientoComponent>;
  const router = { navigate: jasmine.createSpy('navigate') };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule],
      declarations: [FormularioSeguimientoAgendamientoComponent],
      providers: [{ provide: Router, useValue: router }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioSeguimientoAgendamientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deberia direccionar al historico', () => {
    const CODIGO = 'CODIGO01';
    component.formulario = new FormControl(CODIGO, []);
    component.onConsultar();

    expect(router.navigate).toHaveBeenCalledWith([`agendamientos/historico/${CODIGO}`]);
  });
});
