import { Component } from '@angular/core';
import { AngularFire } from 'angularfire2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private _auth;
  constructor(private _af: AngularFire) {
    this._af.auth.subscribe(auth => {
      this._auth = auth;
    });
  }

  title = 'app works!';
}
