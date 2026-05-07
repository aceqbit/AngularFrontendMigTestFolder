import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: false
})
export class AppComponent {
  activeView: 'dashboard' | 'grid' | 'calendar' | 'workflow' = 'dashboard';

  setView(view: any) {
    this.activeView = view;
  }
}
