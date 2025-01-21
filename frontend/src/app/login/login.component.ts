import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { first } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent  {
  loginForm = this.fb.group({
    username : "",
    password: ""
  });
  
  login() {
    const formData = this.loginForm.value;
    this.appService.login({username: formData.username, password: formData.password}).pipe(first()).subscribe({
      next: (response: any) => {
        console.log("hiiii")
        console.log(response.status + " status code")
        console.log(response.body);
        
        
        if(response.status == 200) {
          localStorage.setItem("token", response.body.accessToken);
          let userData: any = jwtDecode(response.body.accessToken);
          localStorage.setItem("username", userData.username);
          localStorage.setItem("id", userData.id);
          localStorage.setItem("isOrganizer", userData.isOrganizer);
          if(userData.isOrganizer) {
          this.router.navigate(["dashboard"]);
        }
          else {
            this.router.navigate(["homepage"]);
          }
        }
      },
      error: (error) => {
        formData.username = "";
        formData.password = "";
        this.router.navigate(["login"]);
        if(error.status == 403) {
          alert("Wrong password");
        }
        if(error.status == 404) {
          alert("User not found");
        }
        if(error.status == 400) {
          alert("Invalid data");
        }
        
      }
    });
    
   
  }

  constructor(private router: Router, private appService: AppService, private fb: FormBuilder) {
    const username = localStorage.getItem("username");
    
  }
  

}
