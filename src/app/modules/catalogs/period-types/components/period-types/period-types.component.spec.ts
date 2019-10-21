import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodTypesComponent } from './period-types.component';

describe('PeriodTypesComponent', () => {
  let component: PeriodTypesComponent;
  let fixture: ComponentFixture<PeriodTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeriodTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeriodTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
