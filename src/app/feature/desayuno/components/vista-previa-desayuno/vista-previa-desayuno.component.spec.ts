import 'zone.js';
import 'zone.js/testing';

import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { VistaPreviaDesayunoComponent } from './vista-previa-desayuno.component';
import { Desayuno } from '@desayuno/share/model/Desayuno';

describe('VistaPreviaDesayunoComponent', () => {
  let component: VistaPreviaDesayunoComponent;
  let fixture: ComponentFixture<VistaPreviaDesayunoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VistaPreviaDesayunoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VistaPreviaDesayunoComponent);
    component = fixture.componentInstance;
    component.desayuno = {} as Desayuno;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
