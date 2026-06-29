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
    expect(component).toBeDefined();
  });

  it('should fail email validation when format lacks @', () => {
    const emailControl = component.registerForm.controls['email'];

    emailControl.setValue('correo-invalido');

    expect(emailControl.invalid).toBeTrue();
    expect(emailControl.errors?.['email']).toBeTrue();
  });

  it('should fail when passwords do not match', () => {
    component.registerForm.patchValue({
      password: 'Test123',
      confirmPassword: 'Otra123'
    });

    expect(component.registerForm.errors?.['passwordsMismatch']).toBeTrue();
  });

  it('should be valid when all required fields are filled correctly with age > 13', () => {
    component.registerForm.patchValue({
      name: 'Test User',
      username: 'testuser',
      email: 'test@example.com',
      password: 'Test123',
      confirmPassword: 'Test123',
      birthDate: '2000-01-01'
    });

    expect(component.registerForm.valid).toBeTrue();
  });
});
