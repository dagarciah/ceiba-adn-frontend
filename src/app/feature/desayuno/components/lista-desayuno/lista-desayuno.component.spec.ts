import { HttpClientModule } from '@angular/common/http';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpService } from '@core/services/http.service';
import { DesayunoService, DesayunoServiceImpl } from '@desayuno/share/service/desayuno.service';
import { of } from 'rxjs';
import { ListaDesayunoComponent } from './lista-desayuno.component';

describe('ListaDesayunoComponent', () => {
  let component: ListaDesayunoComponent;
  let fixture: ComponentFixture<ListaDesayunoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [ ListaDesayunoComponent ],
      providers: [HttpService, { provide: DesayunoService, useClass: DesayunoServiceImpl }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaDesayunoComponent);
    component = fixture.componentInstance;
    component.desayunos = of([]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
