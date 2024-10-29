import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicineAllComponent } from './medicine-all.component';

describe('MedicineAllComponent', () => {
  let component: MedicineAllComponent;
  let fixture: ComponentFixture<MedicineAllComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MedicineAllComponent]
    });
    fixture = TestBed.createComponent(MedicineAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
