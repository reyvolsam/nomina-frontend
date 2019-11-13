import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBajaComponent } from './list-baja.component';

describe('ListProcesoBajaComponent', () => {
  let component: ListBajaComponent;
  let fixture: ComponentFixture<ListBajaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListBajaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListBajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
