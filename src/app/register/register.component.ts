import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FirebaseAuth } from 'angularfire2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  private _registerForm: FormGroup;
  private _actionButtonText: string = "Join";
  private _mode: string = "register";
  private _resolvedMessage: string = "";

  constructor(private _fb: FormBuilder, private _auth: FirebaseAuth) {
    this._registerForm = this._fb.group({
      name: ["", [Validators.required, Validators.minLength(3)]],
      email: ["", [Validators.required, Validators.minLength(6), this.validEmail]],
      passwordMatch: this._fb.group({
        password: ["", [Validators.required, Validators.minLength(6)]],
        passwordRepeat: ["", Validators.required],
      }, { validator: this.matchingPasswords }),
      role: ["", Validators.required]
    });
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
    let passMatch = <FormGroup>this._registerForm.controls['passwordMatch'];
    if (passMatch.controls['password'].touched && passMatch.controls['password'].errors) { return true; }
    return false;
  }
  passwordRepeatFieldError() {
    let passMatch = <FormGroup>this._registerForm.controls['passwordMatch'];
    if (passMatch.controls['passwordRepeat'].touched && (passMatch.controls['passwordRepeat'].errors || passMatch.errors)) { return true; }
    return null;
  }

  fieldHasErrors(fieldKey: string) {
    return this._registerForm.controls[fieldKey].touched && this._registerForm.controls[fieldKey].errors;
  }

  reset(): void {
    this._registerForm.controls['email'].setValue('');
    this._registerForm.controls['email'].markAsUntouched();
    let passMatch = <FormGroup>this._registerForm.controls['passwordMatch'];
    passMatch.controls['password'].setValue('');
    passMatch.controls['passwordRepeat'].setValue('');
    passMatch.controls['password'].markAsUntouched();
    passMatch.controls['passwordRepeat'].markAsUntouched();
    this._mode = "register";
    this._actionButtonText = "Try Again"
    this._resolvedMessage = "";
  }

  onFormSubmit(): void {
    let credentials = {
      name: this._registerForm.value.name,
      email: this._registerForm.value.email,
      password: this._registerForm.value.passwordMatch.password,
      role: this._registerForm.value.role
    };
    this._actionButtonText = "Joining...";
    this._auth.createUser(credentials)
      .then(res => this._onRegisterSuccess(res))
      .catch(res => this._onRegisterFail(res));
  }
  private _onRegisterSuccess(res) {
    let user = res.auth;
    user.sendEmailVerification()
      .then((res) => {
        this._mode = "resolved-success";
        this._resolvedMessage = "Registration completed. A verification email has been sent to " + user.email;
      })
      .catch((res) => {
        this._mode = "resolved-success";
        this._resolvedMessage = "Registration completed. You can now login to the dashboard.";
      })
  }
  private _onRegisterFail(res) {
    this._mode = "resolved-fail";
    this._resolvedMessage = res.message;
  }
}
