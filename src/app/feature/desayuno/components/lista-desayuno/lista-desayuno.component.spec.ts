import { HttpClientModule } from '@angular/common/http';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from '@core/services/http.service';
import { DesayunoService } from '@desayuno/share/service/desayuno.service';
import { DesayunoServiceStub } from '@desayuno/share/service/desayuno.service-stub';
import { Observable } from 'rxjs';
import { BotonComprarDesayunoComponent } from '../boton-comprar-desayuno/boton-comprar-desayuno.component';
import { VistaPreviaDesayunoComponent } from '../vista-previa-desayuno/vista-previa-desayuno.component';
import { ListaDesayunoComponent } from './lista-desayuno.component';

describe('ListaDesayunoComponent', () => {
  let component: ListaDesayunoComponent;
  let fixture: ComponentFixture<ListaDesayunoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule],
      declarations: [
        ListaDesayunoComponent,
        VistaPreviaDesayunoComponent,
        BotonComprarDesayunoComponent
      ],
      providers: [HttpService, { provide: DesayunoService, useClass: DesayunoServiceStub }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaDesayunoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.desayunos).toBeInstanceOf(Observable);
  });
});
