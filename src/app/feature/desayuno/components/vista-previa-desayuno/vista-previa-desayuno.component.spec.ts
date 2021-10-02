import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { VistaPreviaDesayunoComponent } from './vista-previa-desayuno.component';
import { Desayuno } from '@desayuno/share/model/desayuno';
import { BotonComprarDesayunoComponent } from '../boton-comprar-desayuno/boton-comprar-desayuno.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('VistaPreviaDesayunoComponent', () => {
  let component: VistaPreviaDesayunoComponent;
  let fixture: ComponentFixture<VistaPreviaDesayunoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ BotonComprarDesayunoComponent, VistaPreviaDesayunoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VistaPreviaDesayunoComponent);
    component = fixture.componentInstance;
    component.desayuno = {id: 1} as Desayuno;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.desayuno.id).toEqual(1);
  });
});
