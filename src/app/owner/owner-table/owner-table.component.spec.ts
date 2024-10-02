import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerTableComponent } from './owner-table.component';

describe('OwnerTableComponent', () => {
  let component: OwnerTableComponent;
  let fixture: ComponentFixture<OwnerTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OwnerTableComponent]
    });
    fixture = TestBed.createComponent(OwnerTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
