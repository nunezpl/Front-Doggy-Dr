import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VetDetailComponent } from './vet-detail.component';

describe('VetDetailComponent', () => {
  let component: VetDetailComponent;
  let fixture: ComponentFixture<VetDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VetDetailComponent]
    });
    fixture = TestBed.createComponent(VetDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
