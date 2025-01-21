import { Component } from '@angular/core';
import { AppService } from '../app.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  constructor(private fb: FormBuilder, private appService: AppService, private router: Router) {}
  registerForm = this.fb.group({
    username : "",
    password: "",
    email: "",
    isOrganizer: false
    
  });

  register() {
    const formData = this.registerForm.value;
    console.log(formData);
    this.appService.register({username: formData.username, password: formData.password, email: formData.email, isOrganizer: formData.isOrganizer}).pipe(first()).subscribe({
      next: (response: any) => {
        console.log("hiiii")
        console.log(response.status + " status code")
        console.log(response.body);
        
        if(response.status == 201) {
          localStorage.setItem("token", response.body.accessToken);
          let userData: any = jwtDecode(response.body.accessToken);
          localStorage.setItem("username", userData.username);
          localStorage.setItem("id", userData.id);
          localStorage.setItem("isOrganizer", userData.isOrganizer);
          this.router.navigate(["homepage"]);
        }
      },
      error: (error) => {
        formData.username = "";
        formData.password = "";
        formData.email = "";
        this.router.navigate(["register"]);
  }});
  }

}
