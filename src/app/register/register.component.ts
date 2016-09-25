import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public registerForm: FormGroup;

  constructor(private _fb: FormBuilder) {
    this.registerForm = this._fb.group({
      name: ["", [Validators.required, Validators.minLength(6)]],
      email: ["", [Validators.required, Validators.minLength(6), this.validEmail]],
      passwordMatch: this._fb.group({
        password: ["", [Validators.required, Validators.minLength(6)]],
        passwordRepeat: ["", Validators.required],
      }, { validator: this.matchingPasswords }),
      role: ["", Validators.required]
    });
  }

  ngOnInit() {
  }

  matchingPasswords(group: FormGroup) {
    if (group.controls['password'].value === group.controls['passwordRepeat'].value) { return null; }
    return { 'missmatch': true };
  }

  validEmail(control) {
    if (control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) { return null; }
    return { 'invalidEmailAddress': true };
  }

  passwordFieldError() {
    var passMatch = <FormGroup>this.registerForm.controls['passwordMatch'];
    if (passMatch.controls['password'].touched && passMatch.controls['password'].errors) { return true; }
    return false;
  }
  passwordRepeatFieldError() {
    var passMatch = <FormGroup>this.registerForm.controls['passwordMatch'];
    if (passMatch.controls['passwordRepeat'].touched && (passMatch.controls['passwordRepeat'].errors || passMatch.errors)) { return true; }
    return null;
  }

  fieldHasErrors(fieldKey: string) {
    return this.registerForm.controls[fieldKey].touched && this.registerForm.controls[fieldKey].errors;
  }

  onFormSubmit(): void {
    console.log(this.registerForm);
  }

}
