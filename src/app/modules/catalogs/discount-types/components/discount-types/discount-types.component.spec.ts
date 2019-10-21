import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountTypesComponent } from './discount-types.component';

describe('DiscountTypesComponent', () => {
  let component: DiscountTypesComponent;
  let fixture: ComponentFixture<DiscountTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscountTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscountTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
