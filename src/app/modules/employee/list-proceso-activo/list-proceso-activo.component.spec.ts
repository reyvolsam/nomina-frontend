import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProcesoActivoComponent } from './list-proceso-activo.component';

describe('ListProcesoAltaComponent', () => {
  let component: ListProcesoActivoComponent;
  let fixture: ComponentFixture<ListProcesoActivoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListProcesoActivoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListProcesoActivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
