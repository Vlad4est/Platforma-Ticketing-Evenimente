import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrl: './top-navbar.component.scss'
})
export class TopNavbarComponent {


  username = localStorage.getItem("username");
  userAvatarUrl =
    'https://aui.atlassian.com/aui/9.1/docs/images/avatar-person.svg';
    isOrganizer: boolean = localStorage.getItem("isOrganizer") === "true";
    constructor(private router: Router) {}

    logout(){
      localStorage.clear();
      this.router.navigate(["/login"]);

    }
    navigateToCreateEvent() {
      this.router.navigate(["/createEvent"]);
    }
}
