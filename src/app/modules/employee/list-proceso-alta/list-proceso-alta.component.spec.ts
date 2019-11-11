import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProcesoAltaComponent } from './list-proceso-alta.component';

describe('ListProcesoAltaComponent', () => {
  let component: ListProcesoAltaComponent;
  let fixture: ComponentFixture<ListProcesoAltaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListProcesoAltaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListProcesoAltaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
