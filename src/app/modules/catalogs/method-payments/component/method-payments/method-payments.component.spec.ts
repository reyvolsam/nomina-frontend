import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MethodPaymentsComponent } from './method-payments.component';

describe('MethodPaymentsComponent', () => {
  let component: MethodPaymentsComponent;
  let fixture: ComponentFixture<MethodPaymentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MethodPaymentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MethodPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
