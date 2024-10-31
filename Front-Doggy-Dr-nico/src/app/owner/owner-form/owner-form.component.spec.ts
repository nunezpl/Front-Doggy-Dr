import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerFormComponent } from './owner-form.component';

describe('OwnerFormComponent', () => {
  let component: OwnerFormComponent;
  let fixture: ComponentFixture<OwnerFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OwnerFormComponent]
    });
    fixture = TestBed.createComponent(OwnerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
