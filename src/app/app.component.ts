import { Component } from '@angular/core';
import { AngularFire, FirebaseAuth } from 'angularfire2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  private _user;

  constructor(private _af: AngularFire, private _auth: FirebaseAuth) {
    this._auth.subscribe(auth => {
      this._user = auth;
      console.log(this._user);
    });
  }

  logout(): void {
    this._auth.logout();
  }

  title = 'app works!';
}
