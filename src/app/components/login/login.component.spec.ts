import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { provideRouter } from '@angular/router';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be invalid when form is empty', () => {
    expect(component.formData.email).toBe('');
    expect(component.formData.password).toBe('');
    component.onSubmit();
    expect(component.feedbackMessage).toBe('No encontramos una cuenta con ese correo y contrasena.');
  });
});
