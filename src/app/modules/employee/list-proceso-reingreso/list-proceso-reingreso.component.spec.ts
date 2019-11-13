import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProcesoReingresoComponent } from './list-proceso-reingreso.component';

describe('ListProcesoAltaComponent', () => {
  let component: ListProcesoReingresoComponent;
  let fixture: ComponentFixture<ListProcesoReingresoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListProcesoReingresoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListProcesoReingresoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
