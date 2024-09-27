import { Injectable } from '@angular/core';
import { FormArray, FormControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

  public setFieldErrorText(control: FormControl) {
    if (control?.hasError('required') && control.touched) {
      return 'Campo requerido';
    }

    if (control?.hasError('minlength') && control.touched) {
      return `Mínimo ${control.errors!['minlength'].requiredLength} caracteres`;
    }

    if (control?.hasError('maxlength') && control.touched) {
      return `Máximo ${control.errors!['maxlength'].requiredLength} caracteres`;
    }

    if (control?.hasError('notAdult') && control.touched) {
      return 'La persona debe ser mayor o igual a 18 ańos';
    }

    if (control?.hasError('nameExists') && control.touched) {
      return 'El nombre de la persona esta repetido';
    }

    return '';
  }

  public setAgeValidation(control: FormControl): ValidationErrors | null {
    const age = +control.value;
    if (age < 18) {
      return { notAdult: true };
    }

    return null;
  }

  public setRepeatNameValidation(control: FormControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }

    const currentName = control.value?.trim().toLowerCase();
    const peopleFormArray = control.parent?.parent as FormArray

    const nameCount = peopleFormArray.controls
      .map(c => c.get('name')?.value?.trim().toLowerCase())
      .filter(name => name === currentName).length;

    return nameCount > 1 ? { nameExists: true } : null;

  }

}
