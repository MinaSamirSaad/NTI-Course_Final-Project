import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginAdmenComponent } from './login-admen.component';

describe('LoginAdmenComponent', () => {
  let component: LoginAdmenComponent;
  let fixture: ComponentFixture<LoginAdmenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginAdmenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginAdmenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
