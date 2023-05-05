import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';


export class ValidateCustom {
 static passwordMatchValidator(controlName: string, matchingControlName: string):ValidatorFn  {
  return (fControl: AbstractControl):ValidationErrors|null => {
    const control = fControl.get(controlName);
    const matchingControl = fControl.get(matchingControlName);
    // if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
    //     return null;
    // }
    if (control?.value !== matchingControl?.value) {
        let msgerror:ValidationErrors={passwordMatchValidator: 'contraseñas no coinciden'};
        matchingControl?.setErrors(msgerror);
        return msgerror;
    } else {
        matchingControl?.setErrors(null);
        return null;
    }
    
}
}}