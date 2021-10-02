import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BotonComprarDesayunoComponent } from './boton-comprar-desayuno.component';

describe('BotonComprarComponent', () => {
  let component: BotonComprarDesayunoComponent;
  let fixture: ComponentFixture<BotonComprarDesayunoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [BotonComprarDesayunoComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BotonComprarDesayunoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
