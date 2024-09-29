import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.css', '../shared-form-content.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonalInfoComponent {
  @Input() personalInfoForm!: FormGroup;
  @Input() hobbies: string[] = [];

  isInvalid(fieldName: string): boolean {
    return (
      ((this.personalInfoForm.get(fieldName)?.touched ||
        this.personalInfoForm.get(fieldName)?.dirty) &&
        this.personalInfoForm.get(fieldName)?.invalid) ??
      false
    );
  }

  isValid(fieldName: string): boolean {
    return this.personalInfoForm.get(fieldName)?.valid ?? false;
  }

  isFieldInvalid(fieldName: string, errorType: string): boolean {
    return this.personalInfoForm.get(fieldName)?.errors?.[errorType];
  }

  isFieldTouched(fieldName: string): boolean {
    return this.personalInfoForm.get(fieldName)?.touched ?? false;
  }
}
