import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend';

  isLogedIn(): boolean {
    return document.location.pathname !== "/login" && document.location.pathname !== "/register";
  }
}
