import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreatmentAllComponent } from './treatment-all.component';

describe('TreatmentAllComponent', () => {
  let component: TreatmentAllComponent;
  let fixture: ComponentFixture<TreatmentAllComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TreatmentAllComponent]
    });
    fixture = TestBed.createComponent(TreatmentAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
