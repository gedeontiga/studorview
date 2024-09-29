import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { RegisterLoginService } from '../../register-login.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { slideAnimation } from './animations';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css'],
  animations: [slideAnimation],
})
export class RegisterFormComponent implements OnInit {
  registerForm: FormGroup;
  currentStep: number = 1;
  hobbies: string[] = [];
  emailDomain: string = '@studor.com';

  constructor(
    private fb: FormBuilder,
    private registerLoginService: RegisterLoginService
  ) {
    this.registerForm = this.fb.group({
      personalInfo: this.fb.group({
        firstName: [
          '',
          [
            Validators.required,
            Validators.pattern('[a-zA-ZÀ-ÖØ-öø-ÿ]+'),
            Validators.minLength(2),
          ],
        ],
        lastName: [
          '',
          [
            Validators.required,
            Validators.pattern('[a-zA-ZÀ-ÖØ-öø-ÿ]+'),
            Validators.minLength(2),
          ],
        ],
        birthDate: [
          '',
          [
            Validators.required,
            this.dateRangeValidator('1935-01-01', '2010-12-31'),
          ],
        ],
        gender: ['', Validators.required],
        loisir1: ['', Validators.required],
        loisir2: ['', Validators.required],
      }),
      accountInfo: this.fb.group({
        username: ['', Validators.required],
        email: [
          '',
          [Validators.required, Validators.pattern('[a-z0-9._%+-]+')],
          this.emailExistsValidator(),
        ],
        passwordGroup: this.fb.group(
          {
            password: ['', [Validators.required, Validators.minLength(8)]],
            confirmPassword: ['', Validators.required],
          },
          { validators: this.passwordMatchValidator }
        ),
      }),
    });
  }

  get personalInfoForm(): FormGroup {
    return this.registerForm.get('personalInfo') as FormGroup;
  }

  get accountInfoForm(): FormGroup {
    return this.registerForm.get('accountInfo') as FormGroup;
  }

  ngOnInit(): void {
    this.registerLoginService.getAllHobbies().subscribe((hobbies) => {
      this.hobbies = Object.values(hobbies);
    });
  }

  nextStep() {
    if (this.isValidStepOne()) {
      this.currentStep = 2;
    } else {
      this.registerForm.get('personalInfo')?.markAllAsTouched();
    }
  }

  prevStep() {
    this.currentStep = 1;
  }

  isValidStepOne(): boolean {
    const personalInfo = this.registerForm.get('personalInfo') as FormGroup;
    return personalInfo.valid;
  }

  isValidStepTwo(): boolean {
    const accountInfo = this.registerForm.get('accountInfo') as FormGroup;
    return accountInfo.valid;
  }

  onSubmit() {
    if (this.isValidStepTwo()) {
      console.log('Formulaire valide !');
      // Logique de soumission
    } else {
      this.registerForm.get('accountInfo')?.markAllAsTouched();
    }
  }

  markStepTwoTouched() {
    const accountInfo = this.registerForm.get('accountInfo') as FormGroup;
    Object.keys(accountInfo.controls).forEach((field) => {
      const control = accountInfo.get(field);
      control?.markAllAsTouched();
    });
  }

  // Validators
  private dateRangeValidator(minDate: string, maxDate: string) {
    return (control: AbstractControl): ValidationErrors | null => {
      const inputDate = new Date(control.value);
      const min = new Date(minDate);
      const max = new Date(maxDate);
      if (isNaN(inputDate.getTime())) return { invalidDate: true };
      if (inputDate < min || inputDate > max) return { dateOutOfRange: true };
      return null;
    };
  }

  private emailExistsValidator() {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      console.log(control.value + this.emailDomain);

      return this.registerLoginService
        .checkEmailAlreadyExists(control.value + this.emailDomain)
        .pipe(
          map((emailExists) =>
            emailExists ? { emailAlreadyExists: true } : null
          )
        );
    };
  }

  private passwordMatchValidator(
    control: AbstractControl
  ): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password && confirmPassword && password !== confirmPassword) {
      return { passwordMismatch: true };
    }

    return null;
  }
}
