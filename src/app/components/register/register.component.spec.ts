import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be invalid when required fields are empty', () => {
    expect(component.registerForm.valid).toBeFalse();
  });

  it('should be valid when all required fields are filled correctly', () => {
    component.registerForm.patchValue({
      name: 'Test User',
      email: 'test@example.com',
      password: 'Test123',
      confirmPassword: 'Test123',
      birthDate: '2000-01-01'
    });
    expect(component.registerForm.valid).toBeTrue();
  });
});
