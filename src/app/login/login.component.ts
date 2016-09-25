import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth/';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  private _loginForm: FormGroup;
  private _actionButtonText: string = "Login";
  private _mode: string = "login";
  private _resolvedMessage: string = "";

  constructor(private _fb: FormBuilder, private _auth: AuthService) {
    this._loginForm = this._fb.group({
      email: ["", [Validators.required, this.validEmail]],
      password: ["", [Validators.required]]
    });
  }

  fieldHasErrors(fieldKey: string) {
    return this._loginForm.controls[fieldKey].touched && this._loginForm.controls[fieldKey].errors;
  }

  validEmail(control) {
    if (control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) { return null; }
    return { 'invalidEmailAddress': true };
  }

  reset() {
    this._loginForm.reset({ email: '', password: '' });
    this._mode = "login";
    this._resolvedMessage = "";
    this._actionButtonText = "Try Again";
  }

  onFormSubmit() {
    this._auth.login(this._loginForm.value.email, this._loginForm.value.password)
      .then(res => this._onLoginSuccess(res))
      .catch(res => this._onLoginFail(res));
  }

  private _onLoginSuccess(res) {
    this._mode = "resolved-success";
    // go to dashboard
  }

  private _onLoginFail(res) {
    this._mode = "resolved-fail";
    this._resolvedMessage = res.message;
  }

}
