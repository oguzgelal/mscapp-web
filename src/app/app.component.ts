import { Component } from '@angular/core';
import { AuthService } from './services/auth/';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private _auth: AuthService) {
  }

  logout(): void {
    this._auth.logout();
  }

}
