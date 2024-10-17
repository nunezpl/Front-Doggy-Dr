import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginVetComponent } from './login-vet.component';

describe('LoginVetComponent', () => {
  let component: LoginVetComponent;
  let fixture: ComponentFixture<LoginVetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginVetComponent]
    });
    fixture = TestBed.createComponent(LoginVetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
