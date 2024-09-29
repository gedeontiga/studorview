import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.css', '../shared-form-content.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountInfoComponent {
  @Input() accountInfoForm!: FormGroup; // Form group for account info
  showPassword: boolean = false;
  passwordStrength: number = 0;
  passwordColor: string = 'bg-danger';

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  isInvalid(fieldName: string): boolean {
    return (
      ((this.accountInfoForm.get(fieldName)?.touched ||
        this.accountInfoForm.get(fieldName)?.dirty) &&
        this.accountInfoForm.get(fieldName)?.invalid) ??
      false
    );
  }

  isValid(fieldName: string): boolean {
    return this.accountInfoForm.get(fieldName)?.valid ?? false;
  }

  isFieldInvalid(fieldName: string, errorType: string): boolean {
    return this.accountInfoForm.get(fieldName)?.getError(errorType);
  }

  isFieldTouched(fieldName: string): boolean {
    return this.accountInfoForm.get(fieldName)?.touched ?? false;
  }

  isFieldTouchedAndInvalid(fieldName: string, errorType: string): boolean {
    return (
      this.isFieldTouched(fieldName) &&
      this.isFieldInvalid(fieldName, errorType)
    );
  }

  isValidGroup(groupName: string): boolean {
    return Boolean(this.accountInfoForm.get(groupName)?.errors);
  }

  onPasswordInput() {
    const password =
      this.accountInfoForm.get('passwordGroup.password')?.value || '';
    const strength = this.calculatePasswordStrength(password);

    this.passwordStrength = strength;
    this.passwordColor = this.updatePasswordStrengthColor(strength);
  }

  calculatePasswordStrength(password: string): number {
    let strength: number = 0;
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    if (/[\W]/.test(password)) strength += 25;

    return strength;
  }

  updatePasswordStrengthColor(strength: number) {
    if (strength <= 25) {
      return 'bg-danger';
    } else if (strength > 25 && strength <= 75) {
      return 'bg-warning';
    } else {
      return 'bg-success';
    }
  }
}
