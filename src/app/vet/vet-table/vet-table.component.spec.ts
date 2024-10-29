import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VetTableComponent } from './vet-table.component';

describe('VetTableComponent', () => {
  let component: VetTableComponent;
  let fixture: ComponentFixture<VetTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VetTableComponent]
    });
    fixture = TestBed.createComponent(VetTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
