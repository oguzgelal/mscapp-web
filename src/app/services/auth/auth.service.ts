import { Injectable } from '@angular/core';
import { FirebaseAuth, AngularFire } from 'angularfire2';

@Injectable()
export class AuthService {

  public user;
  constructor(private _af: AngularFire, private _auth: FirebaseAuth) {
    this._auth.subscribe(auth => {
      this.user = auth;
      console.log(this.user);
    });
  }

  public createUser(credentials) {
    return this._auth.createUser(credentials)
      .then(res => this.user = res.auth);
  }

  public sendEmailVerification() {
    if (this.user) { return this.user.sendEmailVerification(); }
    return null;
  }

  public login(email: string, password: string) {
    return this._auth.login({ email: email, password: password})
      .then(res => this.user = res.auth);
  }

  public logout() {
    this._auth.logout();
  }

}
