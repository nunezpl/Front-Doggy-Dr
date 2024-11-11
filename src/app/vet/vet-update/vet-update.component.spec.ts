import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VetUpdateComponent } from './vet-update.component';

describe('VetUpdateComponent', () => {
  let component: VetUpdateComponent;
  let fixture: ComponentFixture<VetUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VetUpdateComponent]
    });
    fixture = TestBed.createComponent(VetUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
