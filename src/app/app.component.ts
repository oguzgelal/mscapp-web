import { Component } from '@angular/core';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  items: FirebaseObjectObservable<any[]>;
  constructor(private _af: AngularFire) {
    this.items = _af.database.object('/items');
  }


}
