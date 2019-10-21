import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeTypesComponent } from './employee-types.component';

describe('EmployeeTypesComponent', () => {
  let component: EmployeeTypesComponent;
  let fixture: ComponentFixture<EmployeeTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
