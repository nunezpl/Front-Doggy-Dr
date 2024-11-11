import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreatmentUpdateComponent } from './treatment-update.component';

describe('TreatmentUpdateComponent', () => {
  let component: TreatmentUpdateComponent;
  let fixture: ComponentFixture<TreatmentUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TreatmentUpdateComponent]
    });
    fixture = TestBed.createComponent(TreatmentUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
