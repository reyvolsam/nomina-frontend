import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProcesoBajaComponent } from './list-proceso-baja.component';

describe('ListProcesoBajaComponent', () => {
  let component: ListProcesoBajaComponent;
  let fixture: ComponentFixture<ListProcesoBajaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListProcesoBajaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListProcesoBajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
